import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';

function formatPrice(price) {
  return 'KSh ' + price.toLocaleString();
}

// Pickup locations
const pickupLocations = [
  'Main Store - Nairobi CBD',
  'Westlands Branch',
  'Karen Branch',
  'Eastlands Branch',
];

export default function Checkout() {
  const { cartItems, cartSubtotal, clearCart } = useCart();
  const navigate = useNavigate();

  // Customer info
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Delivery info
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');

  // Payment info
  const [paymentMethod, setPaymentMethod] = useState('');

  // Validation errors
  const [errors, setErrors] = useState({});

  // Track if order is being placed (prevents double-click)
  const [isPlacing, setIsPlacing] = useState(false);

  // Track if order was already placed (prevents empty-cart redirect)
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Shipping depends on delivery method
  const shipping = deliveryMethod === 'Pick Up' ? 0 : 300;
  const total = cartSubtotal + shipping;

  // Only show "cart is empty" if cart is empty AND no order was just placed
  if (cartItems.length === 0 && !orderPlaced) {
    return (
      
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-5xl mb-4">🛒</p>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Add some products before checking out.</p>
        <Link
          to="/"
          className="inline-block px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    if (!fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!email.trim()) newErrors.email = 'Email is required.';
    if (!phone.trim()) newErrors.phone = 'Phone number is required.';
    if (!deliveryMethod) newErrors.deliveryMethod = 'Please select a delivery method.';
    if (!paymentMethod) newErrors.paymentMethod = 'Please select a payment method.';

    // Home Delivery requires address
    if (deliveryMethod === 'Home Delivery') {
      if (!address.trim()) newErrors.address = 'Address is required for home delivery.';
      if (!city.trim()) newErrors.city = 'City is required for home delivery.';
      if (!country.trim()) newErrors.country = 'Country is required for home delivery.';
    }

    // Pick Up requires a location
    if (deliveryMethod === 'Pick Up') {
      if (!pickupLocation) newErrors.pickupLocation = 'Please select a pickup location.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Place the order
  const handlePlaceOrder = (e) => {
    e.preventDefault();

    // Prevent double-click
    if (isPlacing) return;

    if (!validateForm()) return;

    setIsPlacing(true);
    setOrderPlaced(true);

    // Create order object
    const order = {
      orderNumber: 'SN-' + Date.now().toString().slice(-6),
      date: new Date().toISOString(),
      products: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      subtotal: cartSubtotal,
      shipping,
      total,
      paymentMethod,
      deliveryMethod,
      pickupLocation: deliveryMethod === 'Pick Up' ? pickupLocation : '',
      address: deliveryMethod === 'Home Delivery' ? address : '',
      city: deliveryMethod === 'Home Delivery' ? city : '',
      country: deliveryMethod === 'Home Delivery' ? country : '',
      status: 'Processing',
    };

    // Save order to localStorage
    try {
      const existingOrders = JSON.parse(localStorage.getItem('shopnairobi-orders') || '[]');
      existingOrders.unshift(order); // Add new order at the beginning
      localStorage.setItem('shopnairobi-orders', JSON.stringify(existingOrders));
    } catch (err) {
      console.error('Failed to save order:', err);
    }

    // Clear the cart
    clearCart();

    // Navigate to orders page (replace so user can't go back to checkout)
    navigate('/orders', { replace: true });
  };

  // Input field styling helper
  const inputClass = (fieldName) =>
    `w-full px-4 py-2.5 rounded-lg border ${
      errors[fieldName] ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'
    } focus:ring-2 outline-none transition-all text-sm`;

  return (
    <>
    <Navbar/>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-indigo-600 transition-colors">Products</Link>
        <span>/</span>
        <Link to="/cart" className="hover:text-indigo-600 transition-colors">Cart</Link>
        <span>/</span>
        <span className="text-gray-700">Checkout</span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Checkout</h1>

      <form onSubmit={handlePlaceOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Form sections */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">👤 Customer Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className={inputClass('fullName')}
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className={inputClass('email')}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0712 345 678"
                    className={inputClass('phone')}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">🚚 Delivery Information</h2>

              {/* Delivery method selection */}
              <div className="space-y-3 mb-4">
                <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="Home Delivery"
                    checked={deliveryMethod === 'Home Delivery'}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                    className="accent-indigo-600"
                  />
                  <div>
                    <span className="font-medium text-gray-800">Home Delivery</span>
                    <span className="text-sm text-gray-500 ml-2">KSh 300</span>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="Pick Up"
                    checked={deliveryMethod === 'Pick Up'}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                    className="accent-indigo-600"
                  />
                  <div>
                    <span className="font-medium text-gray-800">Pick Up</span>
                    <span className="text-sm text-gray-500 ml-2">Free</span>
                  </div>
                </label>
              </div>
              {errors.deliveryMethod && <p className="text-red-500 text-xs mb-3">{errors.deliveryMethod}</p>}

              {/* Home Delivery fields */}
              {deliveryMethod === 'Home Delivery' && (
                <div className="space-y-4 mt-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="123 Moi Avenue"
                      className={inputClass('address')}
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Nairobi"
                        className={inputClass('city')}
                      />
                      {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                      <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="Kenya"
                        className={inputClass('country')}
                      />
                      {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Pick Up fields */}
              {deliveryMethod === 'Pick Up' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location *</label>
                  <select
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className={inputClass('pickupLocation')}
                  >
                    <option value="">Select a pickup location</option>
                    {pickupLocations.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                  {errors.pickupLocation && <p className="text-red-500 text-xs mt-1">{errors.pickupLocation}</p>}
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">💳 Payment Method</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Cash on Delivery"
                    checked={paymentMethod === 'Cash on Delivery'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-indigo-600"
                  />
                  <span className="font-medium text-gray-800">💵 Cash on Delivery</span>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="M-Pesa"
                    checked={paymentMethod === 'M-Pesa'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-indigo-600"
                  />
                  <span className="font-medium text-gray-800">📱 M-Pesa</span>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Card Payment"
                    checked={paymentMethod === 'Card Payment'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-indigo-600"
                  />
                  <span className="font-medium text-gray-800">💳 Card Payment</span>
                </label>
              </div>
              {errors.paymentMethod && <p className="text-red-500 text-xs mt-2">{errors.paymentMethod}</p>}
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit lg:sticky lg:top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

            {/* Product list */}
            <div className="space-y-3 mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<div class="flex items-center justify-center w-full h-full text-gray-400 text-lg">📦</div>';
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-800 font-medium truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">× {item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{formatPrice(shipping)}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between text-gray-900 font-bold text-base">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            {/* Place Order button */}
            <button
              type="submit"
              disabled={isPlacing}
              className={`w-full mt-6 py-3.5 rounded-xl font-semibold transition-colors ${
                isPlacing
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95'
              }`}
            >
              {isPlacing ? 'Placing Order...' : 'Place Order'}
            </button>

            <Link
              to="/cart"
              className="block w-full mt-3 py-2.5 bg-gray-100 text-gray-700 text-center rounded-xl font-medium hover:bg-gray-200 transition-colors text-sm"
            >
              ← Back to Cart
            </Link>
          </div>
        </div>
      </form>
    </div>
    </>
  );
}