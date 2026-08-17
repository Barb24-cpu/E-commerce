import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Navbar from "../tests/Navbar";
import EmptyCart from "../components/checkout/EmptyCart";
import CheckoutHeader from "../components/checkout/CheckoutHeader";
import CustomerInfo from "../components/checkout/CustomerInfo";
import DeliveryInfo from "../components/checkout/DeliveryInfo";
import PaymentMethod from "../components/checkout/PaymentMethod";
import OrderSummary from "../components/checkout/OrderSummary";
import { validate } from "../components/checkout/CheckoutValidation";

const locations = ["Main Store - Nairobi CBD", "Westlands Branch", "Karen Branch", "Eastlands Branch"];

export default function Checkout() {
  const { cartItems, cartSubtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", deliveryMethod: "",
    address: "", city: "", country: "", pickupLocation: "", paymentMethod: ""
  });
  const [errors, setErrors] = useState({});
  const [isPlacing, setIsPlacing] = useState(false);

  if (!cartItems.length) return <EmptyCart />;

  const update = (field) => (value) => setForm({ ...form, [field]: value });
  const shipping = form.deliveryMethod === "Pick Up" ? 0 : 300;
  const total = cartSubtotal + shipping;

  const placeOrder = (e) => {
    e.preventDefault();
    if (isPlacing) return;
    const newErrors = validate(form);
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;
    setIsPlacing(true);

    const order = {
      orderNumber: `SN-${Date.now().toString().slice(-6)}`,
      date: new Date().toISOString(), products: cartItems,
      subtotal: cartSubtotal, shipping, total, ...form, status: "Processing"
    };

    const orders = JSON.parse(localStorage.getItem("shopnairobi-orders") || "[]");
    localStorage.setItem("shopnairobi-orders", JSON.stringify([order, ...orders]));
    clearCart();
    navigate("/orders", { replace: true });
  };

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <CheckoutHeader />
        <form onSubmit={placeOrder}>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <CustomerInfo {...form} setFullName={update("fullName")} setEmail={update("email")} setPhone={update("phone")} errors={errors} />
              <DeliveryInfo {...form} setDeliveryMethod={update("deliveryMethod")} setAddress={update("address")} setCity={update("city")} setCountry={update("country")} setPickupLocation={update("pickupLocation")} pickupLocations={locations} errors={errors} />
              <PaymentMethod paymentMethod={form.paymentMethod} setPaymentMethod={update("paymentMethod")} error={errors.paymentMethod} />
            </div>
            <OrderSummary cartItems={cartItems} cartSubtotal={cartSubtotal} shipping={shipping} total={total} isPlacing={isPlacing} />
          </div>
        </form>
      </main>
    </>
  );
}