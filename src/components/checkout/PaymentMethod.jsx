export default function PaymentMethod({
  paymentMethod,
  setPaymentMethod,
  error
}) {
  const methods = [
    ["Cash on Delivery", "💵"],
    ["M-Pesa", "📱"],
    ["Card Payment", "💳"]
  ];

  return (
    <section className="bg-white rounded-xl shadow-sm border p-6">
      <h2 className="text-lg font-bold mb-4">
        💳 Payment Method
      </h2>

      <div className="space-y-3">
        {methods.map(([method, icon]) => (
          <label key={method}
            className="flex gap-3 p-3 border rounded-lg cursor-pointer">
            <input
              type="radio"
              name="payment"
              value={method}
              checked={paymentMethod === method}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span>{icon} {method}</span>
          </label>
        ))}
      </div>

      {error && (
        <p className="text-red-500 text-xs mt-2">{error}</p>
      )}
    </section>
  );
}