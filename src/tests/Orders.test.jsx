import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Orders from "../pages/Orders";
import { AuthProvider } from "../context/AuthProvider";
import { CartProvider } from "../context/CartProvider";

function renderOrders() {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <CartProvider>
          <Orders />
        </CartProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}

describe("Orders page", () => {
  it("renders the orders heading", () => {
    renderOrders();
    expect(screen.getByText(/Your Orders/i) || screen.getByText(/Orders/i)).toBeTruthy();
  });

  it("renders no orders message when empty", () => {
    renderOrders();
    expect(screen.getByText(/no orders/i) || screen.getByText(/Your Orders/i)).toBeTruthy();
  });
});
