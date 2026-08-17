import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import OrderSummary from "../components/checkout/OrderSummary";

const cartItems = [
  { id: 1, name: "Product A", image: "test.jpg", price: 1000, quantity: 2 },
  { id: 2, name: "Product B", image: "test2.jpg", price: 500, quantity: 1 },
];

function renderOrderSummary(props = {}) {
  return render(
    <MemoryRouter>
      <OrderSummary
        cartItems={cartItems}
        cartSubtotal={2500}
        shipping={300}
        total={2800}
        isPlacing={false}
        {...props}
      />
    </MemoryRouter>
  );
}

describe("OrderSummary", () => {
  it("renders Order Summary heading", () => {
    renderOrderSummary();
    expect(screen.getByText(/Order Summary/i)).toBeInTheDocument();
  });

  it("renders product names and quantities", () => {
    renderOrderSummary();
    expect(screen.getByText("Product A")).toBeInTheDocument();
    expect(screen.getByText("Product B")).toBeInTheDocument();
    expect(screen.getByText(/× 2/)).toBeInTheDocument();
  });

  it("renders subtotal, shipping, total", () => {
    renderOrderSummary();
    expect(screen.getByText("Subtotal")).toBeInTheDocument();
    expect(screen.getByText("Shipping")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();
  });

  it("renders Place Order button", () => {
    renderOrderSummary();
    expect(screen.getByText(/Place Order/i)).toBeInTheDocument();
  });

  it("renders disabled button when placing", () => {
    renderOrderSummary({ isPlacing: true });
    expect(screen.getByText(/Placing Order/i)).toBeInTheDocument();
  });

  it("renders Back to Cart link", () => {
    renderOrderSummary();
    expect(screen.getByText(/Back to Cart/i)).toBeInTheDocument();
  });
});
