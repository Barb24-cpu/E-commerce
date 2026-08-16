export function getSavedCart() {
  try {
    const savedCart = localStorage.getItem("shopnairobi-cart");

    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
}

export function saveCart(cartItems) {
  localStorage.setItem(
    "shopnairobi-cart",
    JSON.stringify(cartItems)
  );
}