import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-12 pb-8 border-t border-gray-800">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div>
                    <h3 className="text-2xl font-extrabold text-[#FF6A00] mb-3">SokoPlus</h3>
                    <p classname="text-gray-400 text-sm leading-relaxed">
                        Empowering independent online sellers and buyers through transparent, protected ecommerce. 
                    </p>
                </div>

                <div>
                    <h4 className="text-lg font-bold mb-3 text-white">Contact Info</h4>
                    <ul className="text-gray-400 text-sm space-y-2">
                    <li>Email: support@sokoplus.com</li>
                    <li>Phone: +254 700 000 000</li>
                    <li>HQ: Nairobi, Kenya</li>
                    </ul>
                </div>

                {/* Social Links */}
                <div>
                    <h4 className="text-lg font-bold mb-3 text-white">Social media</h4>
                    <div className="flex space-x-4 text-sm">
                        <a href="#twitter" className="text-gray-400 hover:text-[#FF6A00] transition-colors">Twitter</a>
                        <a href="#facebook" className="text-gray-400 hover:text-[#FF6A00] transition-colors">Facebook</a>
                        <a href="#linkedin" className="text-gray-400 hover:text-[#FF6A00] transition-colors">LinkedIn</a>
                        <a href="#Instagram" className="text-gray-400 hover:text-[#FF6A00] transition-colors">Instagram</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}