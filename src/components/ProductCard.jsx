import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

// Helper: format price in KSh
function formatPrice(price) {
  return 'KSh ' + price.toLocaleString();
}

// Helper: get stock label and style
function getStockInfo(stock) {
  if (stock === 0) return { label: 'OUT OF STOCK', color: 'bg-red-100 text-red-700' };
  if (stock === 1) return { label: 'Only 1 left', color: 'bg-orange-100 text-orange-700' };
  if (stock === 2) return { label: 'Only 2 left', color: 'bg-orange-100 text-orange-700' };
  if (stock === 3) return { label: 'Only 3 left', color: 'bg-yellow-100 text-yellow-700' };
  if (stock <= 10) return { label: 'In Stock', color: 'bg-green-100 text-green-700' };
  return { label: 'In Stock', color: 'bg-green-100 text-green-700' };
}

// Helper: render star rating
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '☆' : '') + '☆'.repeat(empty);
}

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const stockInfo = getStockInfo(product.stock);
  const isOutOfStock = product.stock === 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col">
      {/* Product Image - clickable */}
      <Link to={`/products/${product.id}`} className="block">
        <div className="aspect-square bg-gray-100 relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<div class="flex items-center justify-center w-full h-full text-gray-400 text-5xl">📦</div>';
            }}
          />
          {/* Out of stock overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm">
                OUT OF STOCK
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-1">
        {/* Category badge */}
        <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full w-fit mb-2">
          {product.category}
        </span>

        {/* Product name - clickable */}
        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-800 hover:text-indigo-600 transition-colors line-clamp-2 mb-1">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <span className="text-yellow-500 text-sm">{renderStars(product.rating)}</span>
          <span className="text-xs text-gray-500">{product.rating}</span>
        </div>

        {/* Price */}
        <p className="text-lg font-bold text-gray-900 mb-2">{formatPrice(product.price)}</p>

        {/* Stock status */}
        <span className={`text-xs font-semibold px-2 py-1 rounded-full w-fit mb-3 ${stockInfo.color}`}>
          {stockInfo.label}
        </span>

        {/* Add to Cart button */}
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`mt-auto w-full py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
            isOutOfStock
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : added
              ? 'bg-green-500 text-white'
              : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95'
          }`}
        >
          {isOutOfStock ? 'Out of Stock' : added ? '✓ Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
