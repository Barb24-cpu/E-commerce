export default function ProductInfo({ product }) {
  return (
    <div>
      <span className="text-sm text-indigo-600">
        {product.category}
      </span>

      <h1 className="text-2xl font-bold mt-2">
        {product.name}
      </h1>

      <p className="text-yellow-500 mt-3">
        {"★".repeat(Math.floor(product.rating))}
        {"☆".repeat(5 - Math.floor(product.rating))}
      </p>

      <p className="text-3xl font-bold text-indigo-600 mt-4">
        KSh {product.price.toLocaleString()}
      </p>

      <p className="text-gray-600 mt-4">
        {product.description}
      </p>
    </div>
  );
}