import { Link } from "react-router-dom";

export default function EmptyCart() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">
      <p className="text-5xl mb-4">🛒</p>

      <h2 className="text-xl font-semibold text-gray-700 mb-2">
        Your cart is empty
      </h2>

      <p className="text-gray-500 mb-6">
        Add some products before checking out.
      </p>

      <Link
        to="/"
        className="inline-block px-6 py-2.5 bg-indigo-600
        text-white rounded-lg hover:bg-indigo-700"
      >
        Continue Shopping
      </Link>
    </div>
  );
}