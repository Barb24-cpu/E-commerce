import { describe, it, expect } from "vitest";
import { addProduct, removeProduct, increaseProduct, decreaseProduct } from "../context/cartFunctions";

describe("cartFunctions", () => {
  const product = { id: 1, name: "Test", price: 100, stock: 5 };
  const outOfStock = { id: 2, name: "OOS", price: 50, stock: 0 };

  describe("addProduct", () => {
    it("adds new product to empty cart", () => {
      const result = addProduct([], product);
      expect(result).toEqual([{ ...product, quantity: 1 }]);
    });

    it("adds with custom quantity", () => {
      const result = addProduct([], product, 3);
      expect(result).toEqual([{ ...product, quantity: 3 }]);
    });

    it("does not add out-of-stock product", () => {
      const result = addProduct([], outOfStock);
      expect(result).toEqual([]);
    });

    it("increments existing product quantity capped at stock", () => {
      const cart = [{ ...product, quantity: 3 }];
      const result = addProduct(cart, product, 3);
      expect(result[0].quantity).toBe(5); // capped at stock
    });

    it("adds new item alongside existing ones", () => {
      const product2 = { id: 2, name: "Other", price: 200, stock: 10 };
      const cart = [{ ...product, quantity: 1 }];
      const result = addProduct(cart, product2);
      expect(result).toHaveLength(2);
    });
  });

  describe("removeProduct", () => {
    it("removes a product by id", () => {
      const cart = [{ id: 1, name: "A" }, { id: 2, name: "B" }];
      const result = removeProduct(cart, 1);
      expect(result).toEqual([{ id: 2, name: "B" }]);
    });
  });

  describe("increaseProduct", () => {
    it("increases quantity by 1", () => {
      const cart = [{ id: 1, quantity: 2 }];
      const result = increaseProduct(cart, 1, 10);
      expect(result[0].quantity).toBe(3);
    });

    it("caps at stock", () => {
      const cart = [{ id: 1, quantity: 5 }];
      const result = increaseProduct(cart, 1, 5);
      expect(result[0].quantity).toBe(5);
    });

    it("does not affect other items", () => {
      const cart = [{ id: 1, quantity: 2 }, { id: 2, quantity: 3 }];
      const result = increaseProduct(cart, 1, 10);
      expect(result[1].quantity).toBe(3);
    });
  });

  describe("decreaseProduct", () => {
    it("decreases quantity by 1", () => {
      const cart = [{ id: 1, quantity: 3 }];
      const result = decreaseProduct(cart, 1);
      expect(result[0].quantity).toBe(2);
    });

    it("removes item when quantity is 1", () => {
      const cart = [{ id: 1, quantity: 1 }];
      const result = decreaseProduct(cart, 1);
      expect(result).toEqual([]);
    });

    it("does not affect other items", () => {
      const cart = [{ id: 1, quantity: 1 }, { id: 2, quantity: 3 }];
      const result = decreaseProduct(cart, 1);
      expect(result).toEqual([{ id: 2, quantity: 3 }]);
    });
  });
});
