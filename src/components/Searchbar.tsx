"use client"
import { scrapeAndStoreProduct } from '../../lib/actions/index';
import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const isValidAmazonProductURL = (url: string) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    if (
      hostname.includes('amazon.com') || 
      hostname.includes('amazon.') || 
      hostname.endsWith('amazon')
    ) {
      return true;
    }
  } catch (error) {
    return false;
  }

  return false;
}

const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [productId, setProductId] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidLink = isValidAmazonProductURL(searchPrompt);

    if (!isValidLink) return alert('Please provide a valid Amazon link');

    try {
      setIsLoading(true);

      // Scrape the product page
      const product = await scrapeAndStoreProduct(searchPrompt);
      //console.log('Product:', product); // Log the product
      if (Array.isArray(product)) {
        // Handle the case where product is an array
        if (product.length > 0) {
          const firstProduct = product[0];
          if ('_id' in firstProduct) {
            setProductId(firstProduct._id as string); 
            toast.success("Product fetched successfully");
          } else {
            console.error('Product ID is missing in the first product');
          }
        } else {
          console.error('Product array is empty');
        }
      } else if (product && '_id' in product) {
        setProductId((product as { _id: string })._id); 
        toast.success("Product fetched successfully");
      } else {
        console.error('Product ID is missing');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
    
    <form 
      className="flex flex-wrap gap-4 mt-12" 
      onSubmit={handleSubmit}
    >
      <input 
        type="text"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
        placeholder="Enter product link"
        className="searchbar-input"
      />

      <button 
        type="submit" 
        className="searchbar-btn"
        disabled={searchPrompt === ''}
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>

      {productId && (
        <Link href={`/products/${productId}`} legacyBehavior>
          <a className="searchbar-btn">View Product</a>
        </Link>
      )}
    </form>
    <ToastContainer position='top-center' theme='dark'/>
    </>
  )
}

export default Searchbar;
