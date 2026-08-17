import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PaymentMethod from "../components/checkout/PaymentMethod";

describe("PaymentMethod", () => {
  const defaults = {
    paymentMethod: "", setPaymentMethod: vi.fn(), error: null,
  };

  it("renders Payment Method heading", () => {
    render(<PaymentMethod {...defaults} />);
    expect(screen.getByText(/Payment Method/i)).toBeInTheDocument();
  });

  it("renders all three payment options", () => {
    render(<PaymentMethod {...defaults} />);
    expect(screen.getByText(/Cash on Delivery/i)).toBeInTheDocument();
    expect(screen.getByText(/M-Pesa/i)).toBeInTheDocument();
    expect(screen.getByText(/Card Payment/i)).toBeInTheDocument();
  });

  it("renders error message", () => {
    render(<PaymentMethod {...defaults} error="Select payment" />);
    expect(screen.getByText("Select payment")).toBeInTheDocument();
  });

  it("checks the selected method", () => {
    render(<PaymentMethod {...defaults} paymentMethod="M-Pesa" />);
    const mpesaRadio = screen.getByDisplayValue("M-Pesa");
    expect(mpesaRadio).toBeChecked();
  });
});
