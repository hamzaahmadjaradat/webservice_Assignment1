import React, { useState, useEffect } from 'react';
import '../cssFiles/QuoteFetcherPage.css';
import {
    addFavoriteQuote,
    removeFavoriteQuote,
    getUserFavorites,
    fetchQuotesFromFavQs
} from '../api';

export default function QuoteFetcherPage({ user }) {
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(false);
    const [favoriteIds, setFavoriteIds] = useState([]);

    useEffect(() => {
        if (!user) return;

        const loadFavorites = async () => {
            try {
                const favs = await getUserFavorites(user.id);
                setFavoriteIds(favs.map(fav => fav.quote_id));
            } catch (err) {
                console.error('Failed to load favorites', err);
            }
        };
        loadFavorites();
    }, [user]);

    const fetchQuotes = async (pageNumber = 1) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchQuotesFromFavQs(pageNumber);

            if (data.error_code) {
                setError(data.message || 'Validation error');
            } else {
                const updatedQuotes = data.quotes.map(q => ({
                    ...q,
                    user_details: {
                        ...q.user_details,
                        favorite: favoriteIds.includes(q.id)
                    }
                }));
                setQuotes(updatedQuotes);
                setPage(data.page);
                setLastPage(data.last_page);
            }
        } catch (err) {
            console.error(err);
            setError('Failed to fetch quotes');
        } finally {
            setLoading(false);
        }
    };

    const toggleFavorite = async (quote) => {
        try {
            if (quote.user_details?.favorite) {
                await removeFavoriteQuote(user.id, quote.id);
            } else {
                await addFavoriteQuote(user.id, quote);
            }

            setQuotes((prevQuotes) =>
                prevQuotes.map((q) =>
                    q.id === quote.id
                        ? { ...q, user_details: { ...q.user_details, favorite: !quote.user_details.favorite } }
                        : q
                )
            );
        } catch (error) {
            setError('Unable to update favorite status.');
        }
    };

    return (
        <div className="container">
            <h1>Random Quotes</h1>
            <h4 style={{ color: '#555' }}>Logged in as: {user?.username} (ID: {user?.id})</h4>

            <button onClick={() => fetchQuotes(1)}>Load Quotes</button>

            {loading && <p className="loading">Loading...</p>}
            {error && <p className="error">{error}</p>}

            <ul className="quote-list">
                {quotes.map((quote) => (
                    <li key={quote.id} className="quote-card">
                        <p className="quote-body">"{quote.body}"</p>
                        <p className="quote-author">- {quote.author}</p>
                        <button
                            onClick={() => toggleFavorite(quote)}
                            className="favorite-button"
                        >
                            {quote.user_details?.favorite ? '💖 Unfav' : '🤍 Fav'}
                        </button>
                    </li>
                ))}
            </ul>

            {quotes.length > 0 && (
                <div className="pagination">
                    <button
                        disabled={page === 1}
                        onClick={() => fetchQuotes(page - 1)}
                    >
                        Previous
                    </button>
                    <span>Page {page}</span>
                    <button
                        disabled={lastPage}
                        onClick={() => fetchQuotes(page + 1)}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
