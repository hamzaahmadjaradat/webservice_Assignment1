import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../cssFiles/FavoritesPage.css';
import { getQuoteDetails, getAdviceDetails } from '../api';

const USER_ID = 1;

export default function FavoritesPage() {

    const [quotes, setQuotes] = useState([]);
    const [advice, setAdvice] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const [quoteRes, adviceRes] = await Promise.all([
                    axios.get(`http://localhost:3000/api/users/${USER_ID}/favorites`),
                    axios.get(`http://localhost:3000/api/users/${USER_ID}/favorite-advice`)
                ]);

                // Fetch full quote details
                const quoteDetails = await Promise.all(
                    quoteRes.data.map(q => getQuoteDetails(q.quote_id))
                );
                setQuotes(quoteDetails);

                // Fetch full advice details
                const adviceDetails = await Promise.all(
                    adviceRes.data.map(a => getAdviceDetails(a.advice_id))
                );
                setAdvice(adviceDetails);

                console.log('Quotes:', quoteDetails);
                console.log('Advice:', adviceDetails);
            } catch (err) {
                console.error('Error fetching favorites:', err);
                setError('Failed to load favorites');
            }
        };
        fetchFavorites();
    }, []);

    const deleteQuote = async (quoteId) => {
        try {
            await axios.delete(`http://localhost:3000/api/users/${USER_ID}/favorites/${quoteId}`);
            setQuotes(quotes.filter(q => q.id !== quoteId));
        } catch (err) {
            console.error('Failed to delete quote:', err);
        }
    };

    const deleteAdvice = async (adviceId) => {
        try {
            await axios.delete(`http://localhost:3000/api/users/${USER_ID}/favorite-advice/${adviceId}`);
            setAdvice(advice.filter(a => a.id !== adviceId));
        } catch (err) {
            console.error('Failed to delete advice:', err);
        }
    };

    return (
        <div className="favorites-container">
            <h2>My Favorites</h2>
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
        </div>
    );
}
