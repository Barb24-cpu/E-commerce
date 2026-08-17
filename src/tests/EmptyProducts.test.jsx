import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import EmptyProducts from "../components/EmptyProducts";

describe("EmptyProducts", () => {
  it("renders No products found message", () => {
    render(<EmptyProducts clearFilters={vi.fn()} />);
    expect(screen.getByText(/No products found/i)).toBeInTheDocument();
  });

  it("renders Clear Search button", () => {
    render(<EmptyProducts clearFilters={vi.fn()} />);
    expect(screen.getByText(/Clear Search/i)).toBeInTheDocument();
  });

  it("renders search emoji", () => {
    render(<EmptyProducts clearFilters={vi.fn()} />);
    expect(screen.getByText("🔍")).toBeInTheDocument();
  });
});
