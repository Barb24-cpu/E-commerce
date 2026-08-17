import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import OrderCard from "../components/OrderCard";

const order = {
  orderNumber: "ORD-001",
  date: "2025-01-15",
  status: "Processing",
  products: [
    { name: "Item A", price: 1000, quantity: 2 },
    { name: "Item B", price: 500, quantity: 1 },
  ],
  subtotal: 2500,
  shipping: 300,
  total: 2800,
  paymentMethod: "M-Pesa",
  deliveryMethod: "Home Delivery",
  address: "123 St",
  city: "Nairobi",
  country: "Kenya",
};

describe("OrderCard", () => {
  it("renders order number", () => {
    render(<OrderCard order={order} />);
    expect(screen.getByText(/ORD-001/i)).toBeInTheDocument();
  });

  it("renders order status", () => {
    render(<OrderCard order={order} />);
    expect(screen.getByText("Processing")).toBeInTheDocument();
  });

  it("renders product names with quantities", () => {
    render(<OrderCard order={order} />);
    expect(screen.getByText(/Item A × 2/)).toBeInTheDocument();
    expect(screen.getByText(/Item B × 1/)).toBeInTheDocument();
  });

  it("renders subtotal, shipping, total", () => {
    render(<OrderCard order={order} />);
    expect(screen.getByText("Subtotal")).toBeInTheDocument();
    expect(screen.getByText("Shipping")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();
  });

  it("renders payment and delivery info", () => {
    render(<OrderCard order={order} />);
    expect(screen.getByText(/M-Pesa/)).toBeInTheDocument();
    expect(screen.getByText(/Home Delivery/)).toBeInTheDocument();
  });

  it("renders address for home delivery", () => {
    render(<OrderCard order={order} />);
    expect(screen.getByText(/123 St/)).toBeInTheDocument();
  });

  it("renders pickup location for pick up", () => {
    const pickupOrder = { ...order, deliveryMethod: "Pick Up", pickupLocation: "CBD", address: "", city: "", country: "" };
    render(<OrderCard order={pickupOrder} />);
    expect(screen.getByText(/CBD/)).toBeInTheDocument();
  });
});
