import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CartProvider } from "../context/CartProvider";
import { useCart } from "../context/CartContext";

beforeEach(() => { localStorage.clear(); });

function Consumer() {
  const { cartItems, cartCount, cartSubtotal, clearCart } = useCart();
  return (
    <div>
      <span data-testid="count">{cartCount}</span>
      <span data-testid="subtotal">{cartSubtotal}</span>
      <span data-testid="items">{cartItems.length}</span>
      <button onClick={clearCart}>Clear</button>
    </div>
  );
}

function renderWithCart(ui) {
  return render(<MemoryRouter><CartProvider>{ui}</CartProvider></MemoryRouter>);
}

describe("CartProvider", () => {
  it("starts with empty cart", () => {
    renderWithCart(<Consumer />);
    expect(screen.getByTestId("count")).toHaveTextContent("0");
    expect(screen.getByTestId("subtotal")).toHaveTextContent("0");
    expect(screen.getByTestId("items")).toHaveTextContent("0");
  });

  it("clears the cart", () => {
    localStorage.setItem("shopnairobi-cart", JSON.stringify([{ id: 1, name: "Test", price: 100, quantity: 2 }]));
    renderWithCart(<Consumer />);
    expect(screen.getByTestId("count")).toHaveTextContent("2");
    fireEvent.click(screen.getByText("Clear"));
    expect(screen.getByTestId("count")).toHaveTextContent("0");
  });

  it("restores cart from localStorage", () => {
    localStorage.setItem("shopnairobi-cart", JSON.stringify([{ id: 1, name: "Test", price: 500, quantity: 3 }]));
    renderWithCart(<Consumer />);
    expect(screen.getByTestId("count")).toHaveTextContent("3");
    expect(screen.getByTestId("subtotal")).toHaveTextContent("1500");
  });
});
