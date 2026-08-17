import { describe, it, expect, vi } from "vitest";
import { useCart, CartContext } from "../context/CartContext";
import { render, screen } from "@testing-library/react";

function Consumer() {
  const ctx = useCart();
  return <span data-testid="has-ctx">{ctx ? "yes" : "no"}</span>;
}

describe("CartContext + useCart", () => {
  it("useCart returns undefined outside CartProvider", () => {
    render(<Consumer />);
    // useCart does not throw, it returns undefined when no provider
    expect(screen.getByTestId("has-ctx")).toHaveTextContent("no");
  });

  it("useCart returns context value inside CartProvider", () => {
    const value = { cartItems: [], addToCart: vi.fn() };
    render(
      <CartContext.Provider value={value}>
        <Consumer />
      </CartContext.Provider>
    );
    expect(screen.getByTestId("has-ctx")).toHaveTextContent("yes");
  });
});
