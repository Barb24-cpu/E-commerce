export function addProduct(cartItems, product, quantity = 1) {
  if (product.stock === 0) {
    return cartItems;
  }

  const existingItem = cartItems.find(
    (item) => item.id === product.id
  );

  if (existingItem) {
    const newQuantity = Math.min(
      existingItem.quantity + quantity,
      product.stock
    );

    return cartItems.map((item) =>
      item.id === product.id
        ? { ...item, quantity: newQuantity }
        : item
    );
  }

  return [
    ...cartItems,
    {
      ...product,
      quantity,
    },
  ];
}

export function removeProduct(cartItems, productId) {
  return cartItems.filter(
    (item) => item.id !== productId
  );
}

export function increaseProduct(cartItems, productId, stock) {
  return cartItems.map((item) => {
    if (item.id !== productId) {
      return item;
    }

    return {
      ...item,
      quantity: Math.min(
        item.quantity + 1,
        stock
      ),
    };
  });
}

export function decreaseProduct(cartItems, productId) {
  const item = cartItems.find(
    (item) => item.id === productId
  );

  if (item && item.quantity === 1) {
    return cartItems.filter(
      (item) => item.id !== productId
    );
  }

  return cartItems.map((item) =>
    item.id === productId
      ? {
          ...item,
          quantity: item.quantity - 1,
        }
      : item
  );
}