import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import productsData from "../data/products.json";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import ProductImage from "../components/ProductImage";
import ProductInfo from "../components/ProductInfo";
import QuantitySelector from "../components/QuantitySelector";
import AddToCartButton from "../components/AddToCartButton";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = productsData.find(
    (p) => p.id === Number(id)
  );

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="text-center py-16">
          <h2 className="text-xl">Product not found</h2>
          <Link to="/products" className="text-indigo-600">
           🔙 Back 
          </Link>
        </div>
      </>
    );
  }

  const handleAdd = (product, quantity) => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Link to="/products" className="text-indigo-600">
          ← Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-8 mt-6">
          <ProductImage product={product} />

          <div>
            <ProductInfo product={product} />

            {product.stock > 0 && (
              <QuantitySelector
                quantity={quantity}
                setQuantity={setQuantity}
                stock={product.stock}
              />
            )}

            <AddToCartButton
              product={product}
              quantity={quantity}
              addToCart={handleAdd}
              added={added}
            />

            {added && (
              <Link
                to="/cart"
                className="block mt-3 text-orange-600"
              >
                View Cart →
              </Link>
            )}
          </div>
        </div>
      </main>
    </>
  );
}