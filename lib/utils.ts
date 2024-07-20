

import { PriceHistoryItem, Product } from "../types";

const Notification = {
    WELCOME: 'WELCOME',
    CHANGE_OF_STOCK: 'CHANGE_OF_STOCK',
    LOWEST_PRICE: 'LOWEST_PRICE',
    THRESHOLD_MET: 'THRESHOLD_MET',
  }
  const THRESHOLD_PERCENTAGE=40;

  export function extractPrice(...elements: any) {
    for (const element of elements) {
      console.log('Processing element:', element); // Log the element being processed
      const priceText = element.first().text().trim();
      console.log('Extracted price text:', priceText); // Log the extracted text
  
      if (priceText) {
        const cleanPrice = priceText.replace(/[^\d.]/g, '');
        console.log('Clean price text (non-digits removed):', cleanPrice); // Log the cleaned price text
  
        let firstPrice;
  
        if (cleanPrice) {
          firstPrice = cleanPrice.match(/\d+\.\d{2}/)?.[0];
          console.log('Matched first price with decimals:', firstPrice); // Log the matched price with decimals
        }
  
        const finalPrice = firstPrice || cleanPrice;
        console.log('Final price to return:', finalPrice); // Log the final price to be returned
        return finalPrice;
      }
    }
  
    console.log('No valid price found, returning empty string'); // Log if no price is found
    return '';
  }
  
  
  
  
  
  export function extractCurrency(element: any) {
    const currencyText = element.text().trim().slice(0, 1);
    return currencyText ? currencyText : "";
  }
  
  // Extracts description from two possible elements from amazon
  export function extractDescription($: any) {
    // Selector for the feature bullets
    const selectors = [
      "#feature-bullets .a-unordered-list .a-list-item",
    ];
  
    for (const selector of selectors) {
      const elements = $(selector);
      if (elements.length > 0) {
        const textContent = elements
          .map((_: any, element: any) => $(element).text().trim())
          .get()
          .join("\n");
  
        // Split text content into lines and join only the first 10 lines
        const lines = textContent.split("\n").slice(0, 10);
        return lines.join("\n");
      }
    }
  
    // If no matching elements were found, return an empty string
    return "";
  }
  
  
  
  export function getHighestPrice(priceList: PriceHistoryItem[]) {
    let highestPrice = priceList[0];
  
    for (let i = 0; i < priceList.length; i++) {
      if (priceList[i].price > highestPrice.price) {
        highestPrice = priceList[i];
      }
    }
  
    return highestPrice.price;
  }
  
  export function getLowestPrice(priceList: PriceHistoryItem[]) {
    let lowestPrice = priceList[0];
  
    for (let i = 0; i < priceList.length; i++) {
      if (priceList[i].price < lowestPrice.price) {
        lowestPrice = priceList[i];
      }
    }
  
    return lowestPrice.price;
  }
  
  export function getAveragePrice(priceList: PriceHistoryItem[]) {
    const sumOfPrices = priceList.reduce((acc, curr) => acc + curr.price, 0);
    const averagePrice = sumOfPrices / priceList.length || 0;
  
    return averagePrice;
  }
  
  export const getEmailNotifType = (
    scrapedProduct: Product,
    currentProduct: Product
  ) => {
    const lowestPrice = getLowestPrice(currentProduct.priceHistory);
  
    if (scrapedProduct.currentPrice < lowestPrice) {
      return Notification.LOWEST_PRICE as keyof typeof Notification;
    }
    if (!scrapedProduct.isOutOfStock && currentProduct.isOutOfStock) {
      return Notification.CHANGE_OF_STOCK as keyof typeof Notification;
    }
    if (scrapedProduct.discountRate >= THRESHOLD_PERCENTAGE) {
      return Notification.THRESHOLD_MET as keyof typeof Notification;
    }
  
    return null;
  };
  
  export const formatNumber = (num: number = 0) => {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };