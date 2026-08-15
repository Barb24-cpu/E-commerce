import { Link } from "react-router-dom";

export default function CheckoutHeader() {
  return (
    <>
      <div className="flex gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-indigo-600">
          Products
        </Link>
        <span>/</span>
        <Link to="/cart" className="hover:text-indigo-600">
          Cart
        </Link>
        <span>/</span>
        <span>Checkout</span>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Checkout
      </h1>
    </>
  );
}