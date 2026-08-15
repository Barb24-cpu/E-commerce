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