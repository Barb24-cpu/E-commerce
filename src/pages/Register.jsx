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

    //   response from the backend API& throw an error if the response is not ok
         const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Register failed');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div></div>
{/*  creates names input field */}
                <label className="block text-gray-700 mb-1">Name</label>
                {/* input field for name connecting to the state */}
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 border rounded" />
          </div>
          <div></div>
                     <label className="block text-gray-700 mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded" />
          </div>
          <div></div>
