import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Products from "../pages/Products";
import { AuthProvider } from "../context/AuthProvider";
import { CartProvider } from "../context/CartProvider";

function renderProducts() {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <CartProvider>
          <Products />
        </CartProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}

describe("Products page", () => {
  it("renders the page heading", () => {
    renderProducts();
    expect(screen.getByText(/Shop Products/i)).toBeInTheDocument();
  });

  it("renders search input", () => {
    renderProducts();
    expect(screen.getByPlaceholderText(/Search products/i)).toBeInTheDocument();
  });

  it("renders product cards", () => {
    renderProducts();
    const productCards = screen.getAllByRole("heading", { level: 3 });
    expect(productCards.length).toBeGreaterThan(0);
  });

  it("renders category filter select", () => {
    renderProducts();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("renders All category option", () => {
    renderProducts();
    expect(screen.getByRole("option", { name: /All/i })).toBeInTheDocument();
  });
});
