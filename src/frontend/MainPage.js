import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../cssFiles/MainPage.css';

export default function MainPage({ user }) {
    const navigate = useNavigate();

    return (
        <div className="container">
            <h2>Welcome, {user.username}!</h2>

            <button onClick={() => navigate('/quotes')} style={{ marginRight: '10px' }}>
                Go to Quote Fetcher
            </button>

            <button onClick={() => navigate('/advice')} style={{ marginRight: '10px' }}>
                Get Advice
            </button>

            <button onClick={() => navigate('/favorites')} style={{ marginRight: '10px' }}>
                My Favorites
            </button>

            <button onClick={() => navigate('/joke')}>
                😂 Joke Generator
            </button>
        </div>
    );
}
