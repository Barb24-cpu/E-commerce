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