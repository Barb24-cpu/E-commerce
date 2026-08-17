import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ProductInfo from "../components/ProductInfo";

const product = { id: 1, name: "Test Product", category: "Electronics", rating: 4, price: 5000, description: "A great product" };

describe("ProductInfo", () => {
  it("renders product name", () => {
    render(<ProductInfo product={product} />);
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });

  it("renders category", () => {
    render(<ProductInfo product={product} />);
    expect(screen.getByText("Electronics")).toBeInTheDocument();
  });

  it("renders price", () => {
    render(<ProductInfo product={product} />);
    expect(screen.getByText(/KSh 5,000/)).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<ProductInfo product={product} />);
    expect(screen.getByText("A great product")).toBeInTheDocument();
  });

  it("renders star rating", () => {
    render(<ProductInfo product={product} />);
    const stars = screen.getByText(/★★★★☆/);
    expect(stars).toBeInTheDocument();
  });
});
