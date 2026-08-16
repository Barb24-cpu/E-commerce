

function formatPrice(price) {
  return 'KSh ' + price.toLocaleString();
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function OrderCard({ order }) {
 
  const statusColors = {
    Processing: 'bg-yellow-100 text-yellow-700',
    Shipped: 'bg-blue-100 text-blue-700',
    Delivered: 'bg-green-100 text-green-700',
  };

  const statusColor = statusColors[order.status] || 'bg-gray-100 text-gray-700';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6">
     
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-4 border-b border-gray-100">
        <div>
          <h3 className="font-bold text-gray-800">Order #{order.orderNumber}</h3>
          <p className="text-sm text-gray-500">{formatDate(order.date)}</p>
        </div>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusColor}`}>
          {order.status}
        </span>
      </div>
      <div className="space-y-2 mb-4">
        {order.products.map((item, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span className="text-gray-700">
              {item.name} × {item.quantity}
            </span>
            <span className="text-gray-900 font-medium">
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-100 pt-3 space-y-1 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>{formatPrice(order.subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>{formatPrice(order.shipping)}</span>
        </div>
        <div className="flex justify-between text-gray-900 font-bold text-base pt-1">
          <span>Total</span>
          <span>{formatPrice(order.total)}</span>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100 space-y-1 text-sm text-gray-600">
        <p>💳 Payment: <span className="font-medium text-gray-800">{order.paymentMethod}</span></p>
        <p>🚚 Delivery: <span className="font-medium text-gray-800">{order.deliveryMethod}</span></p>
        {order.pickupLocation && (
          <p>📍 Pickup: <span className="font-medium text-gray-800">{order.pickupLocation}</span></p>
        )}
        {order.address && (
          <p>🏠 Address: <span className="font-medium text-gray-800">{order.address}, {order.city}, {order.country}</span></p>
        )}
      </div>
    </div>
  );
}
