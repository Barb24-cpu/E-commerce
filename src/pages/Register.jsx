import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// create the buyer registration component
const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
//   create state for password and error
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

//   calling backend API to register the user
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch('http://localhost:5176/api/register', 
        {
            // save the name, email, and password in the body of the request
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });