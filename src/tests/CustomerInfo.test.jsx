import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CustomerInfo from "../components/checkout/CustomerInfo";

describe("CustomerInfo", () => {
  const defaults = {
    fullName: "", email: "", phone: "",
    setFullName: vi.fn(), setEmail: vi.fn(), setPhone: vi.fn(),
    errors: {},
  };

  it("renders Customer Information heading", () => {
    render(<CustomerInfo {...defaults} />);
    expect(screen.getByText(/Customer Information/i)).toBeInTheDocument();
  });

  it("renders Full Name, Email, Phone labels", () => {
    render(<CustomerInfo {...defaults} />);
    expect(screen.getByText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Phone/i)).toBeInTheDocument();
  });

  it("renders inputs with correct values", () => {
    render(<CustomerInfo {...defaults} fullName="John" email="j@j.com" phone="123" />);
    expect(screen.getByDisplayValue("John")).toBeInTheDocument();
    expect(screen.getByDisplayValue("j@j.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("123")).toBeInTheDocument();
  });

  it("renders error messages", () => {
    render(<CustomerInfo {...defaults} errors={{ fullName: "Required", email: "Invalid", phone: "Missing" }} />);
    expect(screen.getByText("Required")).toBeInTheDocument();
    expect(screen.getByText("Invalid")).toBeInTheDocument();
    expect(screen.getByText("Missing")).toBeInTheDocument();
  });
});
