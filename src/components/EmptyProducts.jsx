export default function EmptyProducts({ clearFilters }) {
  return (
    <div className="text-center py-16">
      <p className="text-5xl mb-4">🔍</p>

      <h2 className="text-xl font-semibold text-gray-700 mb-2">
        No products found
      </h2>

      <p className="text-gray-500 mb-4">
        Try adjusting your search or category filter.
      </p>

      <button
        onClick={clearFilters}
        className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg"
      >
        Clear Search
      </button>
    </div>
  );
}