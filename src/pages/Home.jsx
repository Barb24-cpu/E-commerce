import  { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../tests/Navbar';
import Footer from '../components/Footer';
import Features from '../tests/Features';
import Reviews from '../components/Reviews';

const Home = () => {
    const [reviews] = useState([
        {
            id: 1,
            name: 'Sarah Jenkins',
            role: 'Verified Buyer',
            comment: 'SokoPlus made sourcing items direct from sellers so simple. The protected payment system gave me total peace of mind',
            rating: 5,
        },
        {
            id: 2,
            name: 'David Chen',
            role: 'Independent Merchant',
            comment : 'Listing my inventory here expanded my reach instantly. Safe, straightforward, and super reliable.',
            rating:5,
        },
        {
            id: 3,
            name: 'Elena Rostova',
            role: 'Small Business Owner',
            comment: 'Great customer service and transparent pocesses. Highly recommend SokoPlus to both buyers and sellers.',
            rating: 5,
        },
    ]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
            <Navbar />

            <main className="flex-grow">
                {/* Hero Section */}
              <section className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 pt-16 pb-20 text-center">
                      <p className="text-[#FF6A00] font-bold tracking-widest text-sm mb-6 uppercase">
              WELCOME TO SOKOPLUS
            </p>

                        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Shop Directly from{" "}
              <span className="text-[#FF6A00]">Independent Sellers</span>
            </h1>

            <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-8 leading-relaxed">
              Discover unique products from trusted independent sellers. Shop
              safely with protected payments and transparent transactions.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/products"
                className="bg-[#FF6A00] text-white px-7 py-3 rounded-lg font-semibold hover:bg-[#e05d00] transition-colors shadow-sm"
              >
                Shop Products
              </Link>

              <Link
                to="/products"
                className="border border-gray-300 text-gray-700 px-7 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Explore Products
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <Features />

        {/* Reviews Section */}
        <Reviews reviews={reviews} />

      

        {/* Call To Action (CTA) */}
        <section className="bg-gray-900 text-white py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Shopping?
            </h2>

            <p className="text-gray-400 mb-8">
              Explore products from independent sellers today.
            </p>

            <Link
              to="/products"
              className="inline-block bg-[#FF6A00] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#e05d00] transition-colors shadow-md"
            >
              Browse Products
            </Link>

            
                    </div>
                </section>
            </main>
            <Footer />

        </div>
    );
};

export default Home;