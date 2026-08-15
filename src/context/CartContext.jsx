import { createContext, useContext, useState, useEffect } from 'react';
import productsData from '../data/products.json';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('shopnairobi-cart');

      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      'shopnairobi-cart',
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  const getProductStock = (productId) => {
    const product = productsData.find(
      (product) => product.id === productId
    );

    return product ? product.stock : 0;
  };

  const addToCart = (product) => {
    if (product.stock === 0) return;

    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        const newQuantity = Math.min(
          existingItem.quantity + 1,
          product.stock
        );

        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const addToCartWithQuantity = (product, quantity) => {
    if (product.stock === 0) return;

    const safeQuantity = Math.min(
      quantity,
      product.stock
    );

    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        const newQuantity = Math.min(
          existingItem.quantity + safeQuantity,
          product.stock
        );

        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: safeQuantity,
        },
      ];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) =>
      prev.filter((item) => item.id !== productId)
    );
  };

  const increaseQuantity = (productId) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id !== productId) {
          return item;
        }

        const maxStock = getProductStock(productId);

        return {
          ...item,
          quantity: Math.min(
            item.quantity + 1,
            maxStock
          ),
        };
      })
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItems((prev) => {
      const item = prev.find(
        (item) => item.id === productId
      );

      if (item && item.quantity === 1) {
        return prev.filter(
          (item) => item.id !== productId
        );
      }

      return prev.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
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