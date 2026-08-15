export default function AddToCartButton({
  product,
  quantity,
  addToCart,
  added,
}) {
  const handleClick = () => {
    if (product.stock > 0) {
      addToCart(product, quantity);
    }
  };

  if (product.stock === 0) {
    return (
      <button
        disabled
        className="w-full bg-gray-200 text-gray-400 py-3 rounded"
      >
        Out of Stock
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="w-full bg-orange-400 text-white py-3 rounded hover:bg-orange-600"
    >
      {added ? "✓ Added to Cart" : "🛒 Add to Cart"}
    </button>
  );
}