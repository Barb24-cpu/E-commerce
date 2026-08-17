import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { CartProvider } from "../context/CartProvider";

const product = { id: 1, name: "Test Product", price: 1000, image: "test.jpg", category: "Electronics", rating: 4, stock: 5 };

function renderCard(p = product) {
  return render(
    <MemoryRouter>
      <CartProvider>
        <ProductCard product={p} />
      </CartProvider>
    </MemoryRouter>
  );
}

describe("ProductCard", () => {
  it("renders product name", () => {
    renderCard();
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });

  it("renders product price", () => {
    renderCard();
    expect(screen.getByText(/KSh 1,000/)).toBeInTheDocument();
  });

  it("renders Add to Cart button for in-stock item", () => {
    renderCard();
    expect(screen.getByRole("button", { name: /Add to Cart/i })).toBeInTheDocument();
  });

  it("renders Out of Stock for zero stock", () => {
    renderCard({ ...product, stock: 0 });
    expect(screen.getAllByText(/Out of Stock/i).length).toBeGreaterThanOrEqual(1);
  });

  it("renders category badge", () => {
    renderCard();
    expect(screen.getByText("Electronics")).toBeInTheDocument();
  });
});
