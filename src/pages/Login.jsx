import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// create the buyer component

const BuyerLoginPage = () => {
  const navigate = useNavigate();

//   create state for email, password, showPassword, and errors
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

//   validate the form&email format and password not empty
  const validateForm = () => {
    const formErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // validate email and password
    if (!email) {
      formErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      formErrors.email = "Please enter a valid email address";
    }

    // 
    if (!password) {
      formErrors.password = "Password is required";
    }

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

//  function handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // call backend API
    (async () => {
      try {
        const res = await fetch('http://localhost:5176/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        // parse the JSON response
        const data = await res.json();
        if (!res.ok) {
          setErrors({ form: data.message || 'Login failed' });
          return;
        }
        // save simple session in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/');
      } catch (err) {
        setErrors({ form: err.message });
      }
    })();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-2">
          Buyer Login
        </h2>

        <p className="text-gray-600 text-center mb-6">
          Welcome back! Please login to continue shopping.
        </p>

{/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.form && (
            <p className="text-red-500 text-sm">{errors.form}</p>
          )}
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 mb-1 font-medium"
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 mb-1 font-medium"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                // give the input a padding-right to make space for the show/hide button
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 pr-16 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
              />
{/* Show/Hide Password Button */}
              <button
            
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
              >
                {/* Show/Hide Password Button */}
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
{/*  */}
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* Remember Me $ Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-600">
              <input type="checkbox" className="mr-2" />
              Remember Me
            </label>

            <Link
              to="/forgot-password"
              className="text-[#FF6A00] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#FF6A00] text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Login
          </button>
        </form>

        {/* Create Account */}
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-[#FF6A00] font-semibold hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default BuyerLoginPage;