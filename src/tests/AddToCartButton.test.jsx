import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AddToCartButton from "../components/AddToCartButton";

describe("AddToCartButton", () => {
  const product = { id: 1, name: "Test", stock: 5 };

  it("renders Add to Cart button for in-stock", () => {
    render(<AddToCartButton product={product} quantity={1} addToCart={vi.fn()} added={false} />);
    expect(screen.getByText(/Add to Cart/i)).toBeInTheDocument();
  });

  it("renders Added to Cart when added is true", () => {
    render(<AddToCartButton product={product} quantity={1} addToCart={vi.fn()} added={true} />);
    expect(screen.getByText(/Added to Cart/i)).toBeInTheDocument();
  });

  it("renders Out of Stock for zero stock", () => {
    const oosProduct = { id: 2, name: "OOS", stock: 0 };
    render(<AddToCartButton product={oosProduct} quantity={1} addToCart={vi.fn()} added={false} />);
    expect(screen.getByText(/Out of Stock/i)).toBeInTheDocument();
  });

  it("button is disabled for out of stock", () => {
    const oosProduct = { id: 2, name: "OOS", stock: 0 };
    render(<AddToCartButton product={oosProduct} quantity={1} addToCart={vi.fn()} added={false} />);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
