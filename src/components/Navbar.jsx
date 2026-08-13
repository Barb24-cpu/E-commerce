import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header className="w-full bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
            <div classname="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <Link to="/" className="text-3xl font-extrabold tracking-wider text-[#FF6A00]">
                SokoPlus
                </Link>

                <nav className="flex items-center space-x-8 text-lg font-medium text-gray-700">
                    <NavLink>
                        to="/"
                        classname={({ isActive }) =>
                        isActive ? "text-[#FF6A00] font-bold border-b-2 border-[#FF6800] pb-1" : "hover:text-[#FF6A00] transition-colors"
                        }

                        home
                    </NavLink>
                    <NavLink>
                    to="/products"
                    className={({ isActive }) =>
                        isActive ? "text-[#FF6A00] font-bold border-b-2 border-[#FF6A00] pb-1" : "hover:text-[#FF6A00] transition-colors"
                    }

                    product
                    </NavLink>
                    <NavLink>
                        to="/orders"
                        className={({ isActive }) =>
                       isActive ? "text-[#FF6A00] font-bold border-b-2 border-[#FF6800] pb-1" : "hover:text-[#FF6A00] transition-colors"
                        }
                    </NavLink>

                </nav>

                <div>
                    <Link to="/login" classname="text-lg font-semibold text-gray-800 hover:text-[#FF6A00] transition-color">
                    login
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Navbar;