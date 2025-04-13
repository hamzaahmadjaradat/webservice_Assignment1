import React, { useState } from 'react';
import '../cssFiles/JokeFetcher.css';
import { fetchRandomJoke, addFavoriteJoke, removeFavoriteJoke } from '../api';

export default function JokeFetcher({ user }) {
    const [joke, setJoke] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [favorited, setFavorited] = useState(false);

    const fetchJoke = async () => {
        console.log("Fetch joke triggered");
        setLoading(true);
        setError('');
        setFavorited(false);
        try {
            const data = await fetchRandomJoke();
            setJoke(data);
        } catch (err) {
            console.error('Failed to fetch joke:', err);
            setError('Could not fetch a joke. Try again later.');
        } finally {
            setLoading(false);
        }
    };

    const toggleFavorite = async () => {
        if (!user || !joke) return;

        try {
            if (favorited) {
                await removeFavoriteJoke(user.id, joke.id);
            } else {
                await addFavoriteJoke(user.id, joke);
            }
            setFavorited(!favorited);
        } catch (err) {
            setError('Failed to update favorite status.');
        }
    };

    return (
        <div className="joke-container">
            <h2>Joke Generator</h2>
            <button onClick={fetchJoke} disabled={loading}>
                {loading ? 'Loading...' : 'Tell Me a Joke'}
            </button>
            {error && <p className="error">{error}</p>}
            {joke && (
                <div className="joke-card">
                    <p className="joke-text">"{joke.joke}"</p>
                    <button
                        className="favorite-btn"
                        onClick={toggleFavorite}
                        title={favorited ? "Remove from favorites" : "Add to favorites"}
                    >
                        {favorited ? '💔 Unfavorite' : '🤍 Favorite'}
                    </button>
                </div>
            )}
        </div>
    );
}
