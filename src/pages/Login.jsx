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
}

                // store token in local storage
        
        // 