import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartCount } = useCart();

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        /* Logo */
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-wider text-[#FF6A00]"
        >
          SokoPlus
        </Link>

        /* Navigation */
        <nav className="hidden md:flex items-center space-x-8 text-lg font-medium text-gray-700">

          <NavLink>
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'text-[#FF6A00] font-bold border-b-2 border-[#FF6A00] pb-1'
                : 'hover:text-[#FF6A00] transition-colors'
            }
          
            Home
          </NavLink>

          <NavLink>
            to="/products"
            className={({ isActive }) =>
              isActive
                ? 'text-[#FF6A00] font-bold border-b-2 border-[#FF6A00] pb-1'
                : 'text-gray-700 hover:text-[#FF6A00] transition-colors'
            }
          
            Products
          </NavLink>

          <NavLink>
            to="/orders"
            className={({ isActive }) =>
              isActive
                ? 'text-[#FF6A00] font-bold border-b-2 border-[#FF6A00] pb-1'
                : 'text-gray-700 hover:text-[#FF6A00] transition-colors'
            }
          
            📦 Orders
          </NavLink>

        </nav>

        /* Cart and Login */
        <div className="flex items-center space-x-5">

          <Link>
            to="/cart"
            className="relative text-gray-700 hover:text-[#FF6A00] font-medium transition-colors"
          
            🛒 Cart

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-5 bg-[#FF6A00] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <Link>
            to="/login"
            className="text-lg font-semibold text-gray-800 hover:text-[#FF6A00] transition-colors"
          
            Login
          </Link>

        </div>
      </div>
    </header>
  );
};

export default Navbar;