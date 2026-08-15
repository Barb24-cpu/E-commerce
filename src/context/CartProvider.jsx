import { useEffect, useState } from "react";
import productsData from "../data/products.json";

import { CartContext } from "./CartContext";

import {
  getSavedCart,
  saveCart,
} from "./cartStorage";

import {
  addProduct,
  removeProduct,
  increaseProduct,
  decreaseProduct,
} from "./cartFunctions";

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(
    getSavedCart
  );

  useEffect(() => {
    saveCart(cartItems);
  }, [cartItems]);

  const getProductStock = (productId) => {
    const product = productsData.find(
      (product) => product.id === productId
    );

    return product ? product.stock : 0;
  };

  const addToCart = (product) => {
    setCartItems((prev) =>
      addProduct(prev, product)
    );
  };

  const addToCartWithQuantity = (
    product,
    quantity
  ) => {
    setCartItems((prev) =>
      addProduct(prev, product, quantity)
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) =>
      removeProduct(prev, productId)
    );
  };

  const increaseQuantity = (productId) => {
    const stock = getProductStock(productId);

    setCartItems((prev) =>
      increaseProduct(prev, productId, stock)
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItems((prev) =>
      decreaseProduct(prev, productId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  const cartSubtotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const value = {
    cartItems,
    addToCart,
    addToCartWithQuantity,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    cartCount,
    cartSubtotal,
    getProductStock,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}