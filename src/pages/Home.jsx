import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
    // Reviews state
    const [reviews] = useState([
        {
            id: 1,
            name: 'Sarah Jenkins',
            role: 'Verified Buyer',
            comment: 'SokoPlus made sourcing items direct from sellers so simple. The protected payment system gave me total peace of mind',
            rating: 5,
        },
        {
            id: 2,
            name: 'David Chen',
            role: 'Independent Merchant',
            comment : 'Listing my inventory here expanded my reach instantly. Safe, straightforward, and super reliable.',
            rating:5,
        }
    ])
}