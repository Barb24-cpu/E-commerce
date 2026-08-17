import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import CheckoutHeader from "../components/checkout/CheckoutHeader";

describe("CheckoutHeader", () => {
  it("renders breadcrumb with Products and Cart links", () => {
    render(<MemoryRouter><CheckoutHeader /></MemoryRouter>);
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Cart")).toBeInTheDocument();
  });

  it("renders Checkout heading", () => {
    render(<MemoryRouter><CheckoutHeader /></MemoryRouter>);
    expect(screen.getByRole("heading", { name: /Checkout/i })).toBeInTheDocument();
  });
});
