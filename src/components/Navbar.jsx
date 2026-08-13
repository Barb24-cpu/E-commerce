import { NavLink, Link } from "react-router-dom";const Navbar = () => {
  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-wider text-[#FF6A00]"
        >
          SokoPlus
        </Link>
      </div>
  )
}