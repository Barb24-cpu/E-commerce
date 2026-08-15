import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Buyer login page component
const BuyerLoginPage = () => {
    const navigate = useNavigate();
// create state variables for email, password, showPassword, and error
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error,setError] = useState({});

    // function to handle form submission
    const validateForm = () => {
        const formErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // validate email field
        if (!email) {
            formErrors.email = "Email is required";
        } else if (!emailRegex.test(email)) {
            formErrors.email = "Please enter a valid email address";
        }
        // validate password field
if(!password) {
    formErrors.password = "Password is required";
}
// set error state

setError(formErrors);
return Object.keys(formErrors).length === 0;
};

// function to handle form submission
const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // call backend API
    (async () => {
        try {
            const res = await fetch("http://localhost:5176/api/login",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            // handle response on backend API call
            const data = await res.json();
            if (!res.ok) {
                setErrors({form:data.message || "Login failed"});
                return;
            }
// store token in local storage
            localStorage.setItem('user',JSON.stringify(date.user));
            navigate('/');
        } 
        // handle any errors
        catch (err) {
            setErrors({form:err.message});
        }
    })();
};


return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="W-full max-w-md bg-white rounded-lg shadow-md p-8">
            {/* Heading */}
            <h2 className="text-2xl font-bold text-center mb-2">Buyer Login</h2>

            <p className="text-gray-600 text-center mb-6">Welcome back!Please login to continue shopping.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                {errors.form &&(<p className="text-red-500 text-sm">{errors.form}</p>)}

                {/* Email Field */}

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>

                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                
            </form>
        </div>

                // store token in local storage
        
        // 