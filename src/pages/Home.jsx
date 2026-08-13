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
            <navbar />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="bg-white border-b border-gray-100">
                    <div classname="max-w-7xl mx-auto px-6 py-20 text-center">
                        <p classname="text-[#FF6A00] font-semibold tracking-wider mb-3 uppercase">
                            
                        </p>
                    </div>
                </section>
            </main>

        </div>
    )
}

export default Home;