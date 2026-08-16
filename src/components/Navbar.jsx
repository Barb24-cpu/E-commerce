import { NavLink, Link } from "react-router-dom";const Navbar = () => {
  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-wider text-[#FF6A00]"
        >
          SokoPlus
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-lg font-medium text-gray-700">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-[#FF6A00] font-bold border-b-2 border-[#FF6A00] pb-1"
                : "hover:text-[#FF6A00] transition-colors"
            }
          >
            Home
          </NavLink>

        

          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? "text-[#FF6A00] font-bold border-b-2 border-[#FF6A00] pb-1"
                : "hover:text-[#FF6A00] transition-colors"
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/orders"
            className={({ isActive }) =>
              isActive
                ? "text-[#FF6A00] font-bold border-b-2 border-[#FF6A00] pb-1"
                : "hover:text-[#FF6A00] transition-colors"
            }
          >
            Orders
          </NavLink>
        </nav>

        {/* Cart Emoji Button & Login */}
        <div className="flex items-center space-x-5">
          <Link
            to="/orders"
            aria-label="Shopping Cart"
            className="text-2xl hover:scale-110 transition-transform duration-150"
          >
            🛒
          </Link>

          <Link
            to="/login"
            className="text-lg font-semibold text-gray-800 hover:text-[#FF6A00] transition-colors"
          >
            Login
          </Link>
        </div>



      </div>
      </header>
  );
};

export default Navbar;