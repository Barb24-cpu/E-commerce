import { NavLink, Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { cartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-wider text-[#FF6A00]"
        >
          SokoPlus
        </Link>

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
                : "text-gray-700 hover:text-[#FF6A00] transition-colors"
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/orders"
            className={({ isActive }) =>
              isActive
                ? "text-[#FF6A00] font-bold border-b-2 border-[#FF6A00] pb-1"
                : "text-gray-700 hover:text-[#FF6A00] transition-colors"
            }
          >
            📦 Orders
          </NavLink>
        </nav>

        <div className="flex items-center space-x-5">
          <Link
            to="/cart"
            className="relative text-gray-700 hover:text-[#FF6A00] font-medium transition-colors"
          >
            🛒 Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-5 bg-[#FF6A00] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-700 font-medium">
                👤 {user?.name || user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm font-semibold text-gray-800 hover:text-[#FF6A00] transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-lg font-semibold text-gray-800 hover:text-[#FF6A00] transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
