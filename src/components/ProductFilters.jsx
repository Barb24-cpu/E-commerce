const categories = [
  "All",
  "Electronics",
  "Clothing",
  "Shoes",
  "Beauty",
  "Home",
  "Accessories",
  "Sports",
];

export default function ProductFilters({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  clearFilters,
}) {
  const active = searchQuery || selectedCategory !== "All";

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 outline-none"
      />

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="px-4 py-2.5 rounded-lg border border-gray-300 bg-white"
      >
        {categories.map((category) => (
          <option key={category}>{category}</option>
        ))}
      </select>

      {active && (
        <button
          onClick={clearFilters}
          className="px-4 py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          ✕ Clear
        </button>
      )}
    </div>
  );
}