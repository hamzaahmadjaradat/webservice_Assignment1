import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../cssFiles/Login.css';
import { loginUser } from '../api';

export default function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await loginUser(username, password);

            if (response.message) {
                setError(response.message);
            } else {
                onLogin(response);
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

            <p style={{ marginTop: '1rem' }}>
                Don't have an account?{' '}
                <button
                    onClick={() => navigate('/signup')}
                    style={{
                        color: 'blue',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        padding: 0,
                        font: 'inherit'
                    }}
                >
                    Sign up here
                </button>
            </p>
        </div>
    );
}
