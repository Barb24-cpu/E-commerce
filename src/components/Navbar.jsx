import React, { useState } from 'react';
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
      comment: 'SokoPlus made sourcing items direct from sellers so simple. The protected payment system gave me total peace of mind!',
      rating: 5,
    },
    {
      id: 2,
      name: 'David Chen',
      role: 'Independent Merchant',
      comment: 'Listing my inventory here expanded my reach instantly. Safe, straightforward, and super reliable.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Elena Rostova',
      role: 'Small Business Owner',
      comment: 'Great customer service and transparent processes. Highly recommend SokoPlus to both buyers and sellers.',
      rating: 5,
    },
  ]);

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col justify-between">
      {/* Header */}
      <Navbar />

      <main className="flex-grow">
        
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
          <h2 className="text-sm font-bold tracking-widest text-[#FF6A00] uppercase mb-4">
            PROJECT CONCEPT:
          </h2>
          <p className="text-xl md:text-2xl font-serif text-gray-900 leading-relaxed mb-4">
            Create a trusted marketplace where independent online sellers can post and sell products, 
            while buyers can purchase products through a protected transaction flow.
          </p>

          {/* shop with us CTA Button */}
          <div className="mt-10">
            <Link 
              to="/products"
              className="inline-block bg-[#FF6A00] hover:bg-[#e05d00] text-white font-extrabold text-2xl px-10 py-4 rounded-xl shadow-md transition-all"
            >
              shop with us
            </Link>
          </div>
        </section>

        {/* About Company & How It Works */}
        <section className="bg-gray-50 py-16 border-y border-gray-100">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">
              About SokoPlus
            </h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
              SokoPlus is a dynamic e-commerce marketplace connecting independent sellers with global buyers through a seamless, protected platform.
            </p>

            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
              How The Company Works
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl border border-gray-200 text-center shadow-sm">
                <div className="w-12 h-12 bg-[#FF6A00] text-white font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-4">
                  1
                </div>
                <h4 className="font-bold text-lg mb-2">Sellers Post Products</h4>
                <p className="text-sm text-gray-600">Independent merchants create listings and showcase inventory directly to buyers.</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 text-center shadow-sm">
                <div className="w-12 h-12 bg-[#FF6A00] text-white font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-4">
                  2
                </div>
                <h4 className="font-bold text-lg mb-2">Protected Checkout</h4>
                <p className="text-sm text-gray-600">Buyers order products through an encrypted payment flow that holds funds securely.</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 text-center shadow-sm">
                <div className="w-12 h-12 bg-[#FF6A00] text-white font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-4">
                  3
                </div>
                <h4 className="font-bold text-lg mb-2">Fulfilled & Verified</h4>
                <p className="text-sm text-gray-600">Sellers ship items directly, ensuring fast delivery and full buyer transparency.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            What Our Users Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.id} className="p-6 border border-gray-200 rounded-xl bg-white shadow-sm flex flex-col justify-between">
                <div>
                  <div className="text-[#FF6A00] text-lg mb-2">{'★'.repeat(r.rating)}</div>
                  <p className="text-gray-700 italic text-sm mb-4">"{r.comment}"</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{r.name}</p>
                  <p className="text-xs text-gray-500">{r.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;