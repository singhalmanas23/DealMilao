import HeroCarousel from "@/components/HeroCarousel";
import ProductCard from "@/components/ProductCard";
import Searchbar from "@/components/Searchbar";
import Image from "next/image";
import { getAllProducts } from "../../lib/actions";
import Footer from "@/components/Footer";

const Home = async () => {
  const allProduct = await getAllProducts();

  return (
    <>
      <section className="px-6 md:px-20 py-24 border-2 border-gray-900">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text">
              Unlock the best deals instantly</p>

            <h1 className="head-text">
              Unleash the Power of <br />
              <span className="text-primary">DealMilao</span>
            </h1>

            <p className="mt-6">
              Powerful, self-serve product and growth analytics to help you
              convert, engage, and retain more.
            </p>
            <Searchbar />
          </div>
          <HeroCarousel />
        </div>
      </section>

      <section className="trending-section">
        <h2 className="section-text">Recently Searched Products</h2>

        {allProduct && allProduct.length > 0 ? (
          <div className={`flex flex-wrap gap-x-8 gap-y-16 ${allProduct.length > 6 ? 'overflow-y-auto max-h-96' : ''}`}>
            {allProduct.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p>No products found.</p>
        )}
      </section>

      <section>
        <Footer />
      </section>
    </>
  );
};

export default Home;
