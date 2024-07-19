import { url } from "inspector";
import Product from "../../../../lib/models/products.models";
import { connectToDB } from "../../../../lib/mongoose";
import { scrapeAmazonProduct } from "../../../../lib/scraper";
import {
  getAveragePrice,
  getEmailNotifType,
  getHighestPrice,
  getLowestPrice,
} from "../../../../lib/utils";
import { generateEmailBody, sendEmail } from "../../../../lib/nodemailer";
import { NextResponse } from "next/server";

export const maxDuration = 300; 
export const dynamic = "force-dynamic";
export const revalidate = 0;


export async function GET() {
  try {
    connectToDB();
    const products = await Product.find({});
    if (!products) throw new Error("No product found");
    //Scrape latest product details and update and sending update to the users:
    const updatedProduct = await Promise.all(
      products.map(async (currentProduct) => {
        const scrapedProduct = await scrapeAmazonProduct(currentProduct.url);
        if (!scrapedProduct) throw new Error("No product found");
        const updatedPriceHistory = [
          ...currentProduct.priceHistory,
          { price: scrapedProduct.currentPrice },
        ];

        const product = {
          ...scrapedProduct,
          priceHistory: updatedPriceHistory,
          lowestPrice: getLowestPrice(updatedPriceHistory),
          highestPrice: getHighestPrice(updatedPriceHistory),
          averagePrice: getAveragePrice(updatedPriceHistory),
        };
        const updatedProduct = await Product.findOneAndUpdate(
          { url: product.url },
          product
        );
        const emailNotifyType=getEmailNotifType(scrapedProduct,currentProduct)
        if(emailNotifyType && updatedProduct.users.lentgh>0){
            const productInfo={
                title:updatedProduct.title,
                url:updatedProduct.url,
            }
            const emailContent=await generateEmailBody(productInfo,emailNotifyType);
            const userEmail=updatedProduct.users.map((user:any)=>user.email)
            await sendEmail(emailContent,userEmail);
        }
        return updatedProduct;
      })

    )
    return NextResponse.json({message:'Ok',data:updatedProduct })

  } catch (error) {
    throw new Error(`Error in get:${error}`);
  }
}
