import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { addFavoriteAdvice, getFavoriteAdvice, removeFavoriteAdvice } from '../api';
import '../cssFiles/AdvicePage.css';

const USER_ID = 1; // Replace with the logged-in user ID

export default function AdvicePage() {
    const [advice, setAdvice] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const data = await getFavoriteAdvice(USER_ID);
                setFavorites(data.map(a => a.advice_id));
            } catch (err) {
                console.error('Failed to load favorite advice', err);
            }
        };
        loadFavorites();
    }, []);

    const fetchAdvice = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('https://api.adviceslip.com/advice', {
                headers: { 'Accept': 'application/json' }
            });
            setAdvice(response.data.slip);
            setSearchResults([]);
        } catch (err) {
            console.error('Error fetching advice:', err);
            setError('Could not fetch advice. Try again later.');
        } finally {
            setLoading(false);
        }
    };

    const searchAdvice = async () => {
        if (!searchTerm.trim()) return;
        setLoading(true);
        setError(null);
        setAdvice(null);
        try {
            const response = await axios.get(`https://api.adviceslip.com/advice/search/${searchTerm}`);
            if (response.data.slips) {
                setSearchResults(response.data.slips);
            } else {
                setSearchResults([]);
                setError('No advice found for that search term.');
            }
        } catch (err) {
            console.error('Search error:', err);
            setError('Could not perform search. Try again later.');
        } finally {
            setLoading(false);
        }
    };

    const toggleFavorite = async (advice) => {
        const isFav = favorites.includes(advice.id);
        try {
            if (isFav) {
                await removeFavoriteAdvice(USER_ID, advice.id);
                setFavorites(favorites.filter(id => id !== advice.id));
            } else {
                await addFavoriteAdvice(USER_ID, advice);
                setFavorites([...favorites, advice.id]);
            }
        } catch (error) {
            console.error('Error toggling favorite advice:', error);
            setError('Failed to update favorite.');
        }
    };

    return (
        <div className="container">
            <h2>Need Some Advice?</h2>

            <div style={{ marginBottom: '1rem' }}>
                <button onClick={fetchAdvice} className="fetch-button">Get Random Advice</button>
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <input
                    type="text"
                    placeholder="Search advice..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={searchAdvice} style={{ marginLeft: '0.5rem' }}>Search</button>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {advice && (
                <div className="advice-box">
                    <p className="advice">"{advice.advice}"</p>
                    <p className="advice-id">(Advice ID: {advice.id})</p>
                    <button onClick={() => toggleFavorite(advice)}>
                        {favorites.includes(advice.id) ? '💖 Unfavorite' : '🤍 Favorite'}
                    </button>
                </div>
            )}

            {searchResults.length > 0 && (
                <ul className="advice-results">
                    {searchResults.map((item) => (
                        <li key={item.id}>
                            "{item.advice}" <span style={{ color: '#888' }}>(ID: {item.id})</span>
                            <button onClick={() => toggleFavorite(item)} style={{ marginLeft: '0.5rem' }}>
                                {favorites.includes(item.id) ? '💖' : '🤍'}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}