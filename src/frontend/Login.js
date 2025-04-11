import React, { useState } from 'react';
import axios from 'axios';
import '../cssFiles/Login.css';

export default function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('http://localhost:3000/api/login', {
                username,
                password,
            });

            if (response.data.message) {
                setError(response.data.message); // e.g., "User not found"
            } else {
                onLogin(response.data); // expected { id, username }
            }
        } catch (err) {
            console.error('LOGIN ERROR:', err.response?.data || err.message);
            setError('Something went wrong during login');
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                /><br />
                <input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                /><br />
                <button type="submit">Log In</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
}
