import { describe, it, expect } from "vitest";
import { validate } from "../components/checkout/CheckoutValidation";

describe("CheckoutValidation", () => {
  const baseForm = {
    fullName: "John Doe", email: "john@test.com", phone: "0712345678",
    deliveryMethod: "Home Delivery", address: "123 St", city: "Nairobi", country: "Kenya",
    paymentMethod: "M-Pesa", pickupLocation: "",
  };

  it("returns empty errors for valid form", () => {
    expect(validate(baseForm)).toEqual({});
  });

  it("requires fullName", () => {
    const errors = validate({ ...baseForm, fullName: "  " });
    expect(errors.fullName).toBe("Full name is required.");
  });

  it("requires email", () => {
    const errors = validate({ ...baseForm, email: "" });
    expect(errors.email).toBe("Email is required.");
  });

  it("requires phone", () => {
    const errors = validate({ ...baseForm, phone: "" });
    expect(errors.phone).toBe("Phone is required.");
  });

  it("requires deliveryMethod", () => {
    const errors = validate({ ...baseForm, deliveryMethod: "" });
    expect(errors.deliveryMethod).toBe("Select delivery method.");
  });

  it("requires paymentMethod", () => {
    const errors = validate({ ...baseForm, paymentMethod: "" });
    expect(errors.paymentMethod).toBe("Select payment method.");
  });

  it("requires address for Home Delivery", () => {
    const errors = validate({ ...baseForm, address: "" });
    expect(errors.address).toBe("Address is required.");
  });

  it("requires city for Home Delivery", () => {
    const errors = validate({ ...baseForm, city: "" });
    expect(errors.city).toBe("City is required.");
  });

  it("requires country for Home Delivery", () => {
    const errors = validate({ ...baseForm, country: "" });
    expect(errors.country).toBe("Country is required.");
  });

  it("requires pickupLocation for Pick Up", () => {
    const form = { ...baseForm, deliveryMethod: "Pick Up", pickupLocation: "" };
    const errors = validate(form);
    expect(errors.pickupLocation).toBe("Select pickup location.");
  });

  it("no address errors for Pick Up", () => {
    const form = { ...baseForm, deliveryMethod: "Pick Up", address: "", city: "", country: "", pickupLocation: "CBD" };
    const errors = validate(form);
    expect(errors.address).toBeUndefined();
    expect(errors.city).toBeUndefined();
    expect(errors.country).toBeUndefined();
  });
});
