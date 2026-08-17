import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect } from "vitest";
import ProductDetails from "../pages/ProductDetails";
import { AuthProvider } from "../context/AuthProvider";
import { CartProvider } from "../context/CartProvider";

function renderProductDetails() {
  return render(
    <MemoryRouter initialEntries={["/product/1"]}>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}

describe("ProductDetails page", () => {
  it("renders the product image", () => {
    renderProductDetails();
    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
  });

  it("renders Add to Cart button", () => {
    renderProductDetails();
    expect(screen.getByRole("button", { name: /Add to Cart/i })).toBeInTheDocument();
  });

  it("renders quantity selector", () => {
    renderProductDetails();
    expect(screen.getByText(/Quantity:/i)).toBeInTheDocument();
  });
});
