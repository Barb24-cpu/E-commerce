import { Link } from "react-router-dom";

export default function OrderSummary({
  cartItems, cartSubtotal, shipping, total, isPlacing
}) {
  const price = (value) => `KSh ${value.toLocaleString()}`;

  return (
    <aside className="bg-white rounded-xl shadow-sm border p-6 h-fit">
      <h2 className="text-lg font-bold mb-4">Order Summary</h2>

      {cartItems.map((item) => (
        <div key={item.id} className="flex gap-3 mb-3">
          <img src={item.image} alt={item.name}
            className="w-12 h-12 object-cover rounded" />

          <div className="flex-1">
            <p className="text-sm font-medium truncate">{item.name}</p>
            <p className="text-xs text-gray-500">× {item.quantity}</p>
          </div>

          <span className="text-sm font-semibold">
            {price(item.price * item.quantity)}
          </span>
        </div>
      ))}

      <Totals subtotal={cartSubtotal} shipping={shipping}
        total={total} price={price} />

      <button type="submit" disabled={isPlacing}
        className="w-full mt-6 py-3 rounded-xl bg-indigo-600
        text-white font-semibold disabled:bg-gray-400">
        {isPlacing ? "Placing Order..." : "Place Order"}
      </button>

      <Link to="/cart"
        className="block text-center mt-3 py-2 bg-gray-100 rounded-xl">
        ← Back to Cart
      </Link>
    </aside>
  );
}

function Totals({ subtotal, shipping, total, price }) {
  return (
    <div className="border-t pt-4 space-y-2 text-sm">
      <p className="flex justify-between">
        <span>Subtotal</span><span>{price(subtotal)}</span>
      </p>
      <p className="flex justify-between">
        <span>Shipping</span><span>{price(shipping)}</span>
      </p>
      <p className="flex justify-between border-t pt-2 font-bold">
        <span>Total</span><span>{price(total)}</span>
      </p>
    </div>
  );
}