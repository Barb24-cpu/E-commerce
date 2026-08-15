import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OrderCard from "../components/OrderCard";
import Navbar from "../components/Navbar";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = () => {
      const saved = JSON.parse(
        localStorage.getItem("shopnairobi-orders") || "[]"
      );
      setOrders(saved);
    };

    loadOrders();
    window.addEventListener("storage", loadOrders);

    return () => window.removeEventListener("storage", loadOrders);
  }, []);

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {orders.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-6xl mb-4">📦</p>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              You have no orders yet
            </h2>
            <p className="text-gray-500 mb-6">
              Start shopping to see your orders here.
            </p>

            <Link
              to="/"
              className="inline-block px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold">
                My Orders
              </h1>
              <span className="text-sm text-gray-500">
                {orders.length} order{orders.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="space-y-4">
              {orders.map((order, index) => (
                <OrderCard
                  key={order.orderNumber || index}
                  order={order}
                />
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                to="/"
                className="inline-block px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                ← Continue Shopping
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}