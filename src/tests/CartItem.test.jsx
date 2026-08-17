import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import CartItem from "../components/CartItem";
import { CartProvider } from "../context/CartProvider";

const item = { id: 1, name: "Test Item", price: 1000, image: "test.jpg", quantity: 2 };

// Need products in localStorage so getProductStock works
beforeEach(() => {
  // CartProvider reads from products.json internally for stock
});

function renderCartItem() {
  return render(
    <MemoryRouter>
      <CartProvider>
        <CartItem item={item} />
      </CartProvider>
    </MemoryRouter>
  );
}

describe("CartItem", () => {
  it("renders item name", () => {
    renderCartItem();
    expect(screen.getByText("Test Item")).toBeInTheDocument();
  });

  it("renders item price", () => {
    renderCartItem();
    expect(screen.getByText(/KSh 1,000/)).toBeInTheDocument();
  });

  it("renders item quantity", () => {
    renderCartItem();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("renders Remove button", () => {
    renderCartItem();
    expect(screen.getByText(/Remove/i)).toBeInTheDocument();
  });

  it("renders increase and decrease buttons", () => {
    renderCartItem();
    expect(screen.getByText("−")).toBeInTheDocument();
    expect(screen.getByText("+")).toBeInTheDocument();
  });

  it("renders total price", () => {
    renderCartItem();
    expect(screen.getByText(/KSh 2,000/)).toBeInTheDocument();
  });
});
