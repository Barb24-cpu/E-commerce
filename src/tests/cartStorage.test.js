import { describe, it, expect, beforeEach } from "vitest";
import { getSavedCart, saveCart } from "../context/cartStorage";

describe("cartStorage", () => {
  beforeEach(() => { localStorage.clear(); });

  it("returns empty array when no cart saved", () => {
    expect(getSavedCart()).toEqual([]);
  });

  it("saves and retrieves cart", () => {
    const cart = [{ id: 1, name: "Test", price: 100, quantity: 2 }];
    saveCart(cart);
    expect(getSavedCart()).toEqual(cart);
  });

  it("returns empty array on invalid JSON", () => {
    localStorage.setItem("shopnairobi-cart", "not-json");
    expect(getSavedCart()).toEqual([]);
  });
});
