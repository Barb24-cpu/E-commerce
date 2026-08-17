import { useState } from "react";
import productsData from "../data/products.json";
import ProductCard from "../components/ProductCard";
import ProductFilters from "../components/ProductFilters";
import EmptyProducts from "../components/EmptyProducts";
import Navbar from "../tests/Navbar";

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = productsData.filter((product) => {
    const search = searchQuery.toLowerCase();

    const matchesSearch =
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search);

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  return (
    <>
    <Navbar/>
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        Shop Products
      </h1>

      <ProductFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        clearFilters={clearFilters}
      />

      <p className="text-sm text-gray-500 mb-6">
        {filteredProducts.length} Product
        {filteredProducts.length !== 1 && "s"}
      </p>

      {filteredProducts.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <EmptyProducts clearFilters={clearFilters} />
      )}
    </div>
    </>
  );
}