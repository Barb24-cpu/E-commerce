import  { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
    // Reviews state
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
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900">
                Why Choose SokoPlus?
              </h2>

              <p className="text-gray-600 mt-2">
                Everything you need for a safe and simple shopping experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 bg-orange-100 text-[#FF6A00] font-bold text-lg rounded-full flex items-center justify-center mx-auto mb-4">
                  01
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Independent Sellers
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  Discover products directly from independent merchants.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 bg-orange-100 text-[#FF6A00] font-bold text-lg rounded-full flex items-center justify-center mx-auto mb-4">
                  02
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Protected Payments
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  Shop with confidence using our protected payment system.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 bg-orange-100 text-[#FF6A00] font-bold text-lg rounded-full flex items-center justify-center mx-auto mb-4">
                  03
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Trusted Marketplace
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  Transparent transactions between buyers and sellers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="bg-white py-16 border-y border-gray-100">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900">
                What Our Customers Say
              </h2>

              <p className="text-gray-600 mt-2">
                Trusted by buyers and independent sellers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="border border-gray-200 rounded-xl p-6 shadow-sm bg-white"
                >
                  {/* Rating Stars */}
                  <div className="flex mb-4">
                    {Array.from({ length: review.rating }).map((_, index) => (
                      <span
                        key={index}
                        className="text-[#FF6A00] text-xl mr-1"
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <p className="text-gray-600 mb-5 italic">
                    "{review.comment}"
                  </p>

                  <h4 className="font-bold text-gray-900">
                    {review.name}
                  </h4>

                  <p className="text-sm text-gray-500">{review.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

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