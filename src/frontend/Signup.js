import React, { useState } from 'react';
import '../cssFiles/SignUp.css';
import { signupUser, checkUsernameExists, checkEmailExists } from '../api';

export default function SignUp({ onSignup }) {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [checking, setChecking] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setChecking(true);

        try {
            const [usernameRes, emailRes] = await Promise.all([
                checkUsernameExists(form.username),
                checkEmailExists(form.email)
            ]);

            if (usernameRes.exists) {
                setError('Username already taken.');
                setChecking(false);
                return;
            }

            if (emailRes.exists) {
                setError('Email is already registered.');
                setChecking(false);
                return;
            }

            const response = await signupUser(form.username, form.email, form.password);

            if (response.message === 'User created successfully') {
                setSuccess('Account created successfully! You can now log in.');
                onSignup && onSignup();
                setForm({ username: '', email: '', password: '' });
            } else {
                setError(response.message || 'Signup failed.');
            }
        } catch (err) {
            console.error('SIGNUP ERROR:', err.response?.data || err.message);
            setError('Something went wrong. Please try again.');
        } finally {
            setChecking(false);
        }
    };

    return (
        <div className="signup-container">
            <h2>Create an Account</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    required
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit" disabled={checking}>
                    {checking ? 'Checking...' : 'Sign Up'}
                </button>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
            </form>
        </div>
    );
}
