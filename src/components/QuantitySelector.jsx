export default function QuantitySelector({
  quantity,
  setQuantity,
  stock,
}) {
  const decrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increase = () => {
    if (quantity < stock) setQuantity(quantity + 1);
  };

  return (
    <div className="flex items-center gap-4 my-6">
      <span>Quantity:</span>

      <button
        onClick={decrease}
        className="w-10 h-10 border rounded"
      >
        −
      </button>

      <span className="font-bold">
        {quantity}
      </span>

      <button
        onClick={increase}
        className="w-10 h-10 border rounded"
      >
        +
      </button>
    </div>
  );
}
