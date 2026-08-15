import { useCart } from '../context/CartContext';

function formatPrice(price) {
  return 'KSh ' + price.toLocaleString();
}

export default function CartItem({ item }) {
  const { increaseQuantity, decreaseQuantity, removeFromCart, getProductStock } = useCart();
  const maxStock = getProductStock(item.id);
  const isAtMaxStock = item.quantity >= maxStock;

  return (
    <div className="flex gap-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      {/* Product image */}
      <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.innerHTML = '<div class="flex items-center justify-center w-full h-full text-gray-400 text-3xl">📦</div>';
          }}
        />
      </div>

      {/* Product details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">{item.name}</h3>
        <p className="text-indigo-600 font-bold mt-1">{formatPrice(item.price)}</p>

        {/* Quantity controls */}
        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={() => decreaseQuantity(item.id)}
            className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center transition-colors"
          >
            −
          </button>
          <span className="text-gray-800 font-semibold text-lg min-w-[2rem] text-center">{item.quantity}</span>
          <button
            onClick={() => increaseQuantity(item.id)}
            disabled={isAtMaxStock}
            className={`w-8 h-8 rounded-lg font-bold flex items-center justify-center transition-colors ${
              isAtMaxStock
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            +
          </button>
        </div>

        {/* Item total */}
        <p className="text-gray-600 text-sm mt-1">
          Total: <span className="font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</span>
        </p>

        {/* Remove button */}
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-red-500 hover:text-red-700 text-sm font-medium mt-2 transition-colors"
        >
          🗑️ Remove
        </button>
      </div>
    </div>
  );
}
