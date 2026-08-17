import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import EmptyCart from "../components/checkout/EmptyCart";

describe("EmptyCart", () => {
  it("renders empty cart message", () => {
    render(<MemoryRouter><EmptyCart /></MemoryRouter>);
    expect(screen.getByText(/cart is empty/i)).toBeInTheDocument();
  });

  it("renders Continue Shopping link", () => {
    render(<MemoryRouter><EmptyCart /></MemoryRouter>);
    expect(screen.getByText(/Continue Shopping/i)).toBeInTheDocument();
  });

  it("renders cart emoji", () => {
    render(<MemoryRouter><EmptyCart /></MemoryRouter>);
    expect(screen.getByText("🛒")).toBeInTheDocument();
  });
});
