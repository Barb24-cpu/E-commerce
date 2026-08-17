import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Cart from "../pages/Cart";
import { AuthProvider } from "../context/AuthProvider";
import { CartProvider } from "../context/CartProvider";

function renderCart() {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <CartProvider>
          <Cart />
        </CartProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}

describe("Cart page", () => {
  it("renders the cart heading when empty", () => {
    renderCart();
    expect(screen.getByText(/Your Cart/i) || screen.getByText(/cart is empty/i)).toBeTruthy();
  });

  it("renders checkout link or empty cart message", () => {
    renderCart();
    const checkoutLink = screen.queryByText(/Checkout/i);
    const emptyMsg = screen.queryByText(/cart is empty/i);
    expect(checkoutLink || emptyMsg).toBeTruthy();
  });
});
