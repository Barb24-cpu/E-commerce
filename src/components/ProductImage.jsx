export default function ProductImage({ product }) {
  return (
    <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-square">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.style.display = "none";
        }}
      />
    </div>
  );
}