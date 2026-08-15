import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BuyerLoginPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState("");
    const [error,setError] = useState(null);

  