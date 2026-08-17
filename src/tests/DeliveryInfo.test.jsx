import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import DeliveryInfo from "../components/checkout/DeliveryInfo";

describe("DeliveryInfo", () => {
  const defaults = {
    deliveryMethod: "", setDeliveryMethod: vi.fn(),
    address: "", setAddress: vi.fn(),
    city: "", setCity: vi.fn(),
    country: "", setCountry: vi.fn(),
    pickupLocation: "", setPickupLocation: vi.fn(),
    pickupLocations: ["CBD", "Westlands"],
    errors: {},
  };

  it("renders Delivery Information heading", () => {
    render(<DeliveryInfo {...defaults} />);
    expect(screen.getByText(/Delivery Information/i)).toBeInTheDocument();
  });

  it("renders Home Delivery and Pick Up options", () => {
    render(<DeliveryInfo {...defaults} />);
    expect(screen.getByText(/Home Delivery/i)).toBeInTheDocument();
    expect(screen.getByText(/Pick Up/i)).toBeInTheDocument();
  });

  it("shows address fields when Home Delivery selected", () => {
    render(<DeliveryInfo {...defaults} deliveryMethod="Home Delivery" />);
    expect(screen.getByText(/Address/i)).toBeInTheDocument();
    expect(screen.getByText(/City/i)).toBeInTheDocument();
    expect(screen.getByText(/Country/i)).toBeInTheDocument();
  });

  it("shows pickup select when Pick Up selected", () => {
    render(<DeliveryInfo {...defaults} deliveryMethod="Pick Up" />);
    expect(screen.getByText(/Select pickup location/i)).toBeInTheDocument();
  });

  it("renders delivery method error", () => {
    render(<DeliveryInfo {...defaults} errors={{ deliveryMethod: "Select delivery" }} />);
    expect(screen.getByText("Select delivery")).toBeInTheDocument();
  });
});
