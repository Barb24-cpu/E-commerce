import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

// Temporary placeholder pages
const Products =() => <div className="p-10 text-2xl font-bold text-center">Products Page</div>
const Orders =() => <div className="p-10 text-2xl font-bold text-center">Orders Page</div>
const Login =() => <div className="p-10 text-2xl font-bold text-center">Login Page</div>

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" elements={<Products />} />
        <Route path="/orders" elements={<Orders />} />
        <Route path="/login" elements={<Login />} />
      </Routes>
    </Router>
  )
}

export default App