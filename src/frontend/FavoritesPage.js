import React, { useEffect, useState } from 'react';
import '../cssFiles/FavoritesPage.css';
import {
    getUserFavorites,
    getFavoriteAdvice,
    getQuoteDetails,
    getAdviceDetails,
    getFavoriteJokes,
    removeFavoriteQuote,
    removeFavoriteAdvice,
    removeFavoriteJoke
} from '../api';

export default function FavoritesPage({ user }) {
    const [quotes, setQuotes] = useState([]);
    const [advice, setAdvice] = useState([]);
    const [jokes, setJokes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) return;

        const fetchFavorites = async () => {
            try {
                const [userQuotes, userAdvice, userJokes] = await Promise.all([
                    getUserFavorites(user.id),
                    getFavoriteAdvice(user.id),
                    getFavoriteJokes(user.id)
                ]);

                const quoteDetails = await Promise.all(
                    userQuotes.map(q => getQuoteDetails(q.quote_id))
                );
                setQuotes(quoteDetails);

                const adviceDetails = await Promise.all(
                    userAdvice.map(a => getAdviceDetails(a.advice_id))
                );
                setAdvice(adviceDetails);

                setJokes(userJokes);
            } catch (err) {
                setError('Failed to load favorites');
            }
        };

        fetchFavorites();
    }, [user]);

    const deleteQuote = async (quoteId) => {
        try {
            await removeFavoriteQuote(user.id, quoteId);
            setQuotes(prev => prev.filter(q => q.id !== quoteId));
        } catch (err) {
            console.error('Failed to delete quote:', err);
        }
    };

    const deleteAdvice = async (adviceId) => {
        try {
            await removeFavoriteAdvice(user.id, adviceId);
            setAdvice(prev => prev.filter(a => a.id !== adviceId));
        } catch (err) {
            console.error('Failed to delete advice:', err);
        }
    };

    const deleteJoke = async (jokeId) => {
        try {
            await removeFavoriteJoke(user.id, jokeId);
            setJokes(prev => prev.filter(j => j.joke_id !== jokeId));
        } catch (err) {
            console.error('Failed to delete joke:', err);
        }
    };

    return (
        <div className="favorites-container">
            <h2>My Favorites</h2>
            <h4 style={{ color: '#555' }}>Logged in as: {user?.username} (ID: {user?.id})</h4>
            {error && <p className="error">{error}</p>}

            <section>
                <h3>💬 Favorite Quotes</h3>
                <div className="favorites-grid">
                    {quotes.map((quote, index) => (
                        <div className="favorite-card" key={quote.id || `quote-${index}`}>
                            <p className="text">"{quote.body}"</p>
                            <p className="author">- {quote.author}</p>
                            <button className="delete-btn" onClick={() => deleteQuote(quote.id)}>🗑️</button>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h3>🧠 Favorite Advice</h3>
                <div className="favorites-grid">
                    {advice.map((item, index) => (
                        <div className="favorite-card" key={item.id || `advice-${index}`}>
                            <p className="text">"{item.advice_text}"</p>
                            <button className="delete-btn" onClick={() => deleteAdvice(item.id)}>🗑️</button>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h3>🤣 Favorite Jokes</h3>
                <div className="favorites-grid">
                    {jokes.map((joke, index) => (
                        <div className="favorite-card" key={joke.joke_id || `joke-${index}`}>
                            <p className="text">"{joke.joke_text}"</p>
                            <button className="delete-btn" onClick={() => deleteJoke(joke.joke_id)}>🗑️</button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
