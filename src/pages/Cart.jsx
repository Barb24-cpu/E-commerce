import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import Navbar from '../components/Navbar';

function formatPrice(price) {
  return 'KSh ' + price.toLocaleString();
}

export default function Cart() {
  const { cartItems, cartSubtotal, clearCart } = useCart();

  // Shipping cost (default for home delivery)
  const shipping = cartSubtotal > 0 ? 300 : 0;
  const total = cartSubtotal + shipping;

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-6xl mb-4">🛒</p>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
        <Link
          to="/"
          className="inline-block px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <>
    <Navbar/>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Shopping Cart</h1>
        <button
          onClick={clearCart}
          className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
        >
          🗑️ Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Cart Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit lg:sticky lg:top-24">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal ({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})</span>
              <span>{formatPrice(cartSubtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>{formatPrice(shipping)}</span>
            </div>
            <div className="border-t border-gray-200 pt-3 flex justify-between text-gray-900 font-bold text-base">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <Link
            to="/checkout"
            className="block w-full mt-6 py-3 bg-indigo-600 text-white text-center rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
          >
            Proceed to Checkout
          </Link>

          <Link
            to="/"
            className="block w-full mt-3 py-2.5 bg-gray-100 text-gray-700 text-center rounded-xl font-medium hover:bg-gray-200 transition-colors text-sm"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
