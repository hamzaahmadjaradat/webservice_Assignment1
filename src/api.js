import axios from 'axios';

const API_BASE = 'http://localhost:3000/api'; // Your backend's base URL

// GET favorites for a user
export const getUserFavorites = async (userId) => {
    const response = await axios.get(`${API_BASE}/users/${userId}/favorites`);
    return response.data;
};

// POST quote + favorite to DB
export const addFavoriteQuote = async (userId, quote) => {
    const response = await axios.post(`${API_BASE}/users/${userId}/favorites`, {
        quote_id: quote.id,
        body: quote.body,
        author: quote.author
    });
    return response.data;
};

export const removeFavoriteQuote = async (userId, quoteId) => {
    const response = await axios.delete(`${API_BASE}/users/${userId}/favorites/${quoteId}`);
    return response.data;
};

export const getFavoriteAdvice = async (userId) => {
    const response = await axios.get(`${API_BASE}/users/${userId}/favorite-advice`);
    return response.data;
};

export const addFavoriteAdvice = async (userId, advice) => {
    return await axios.post(`${API_BASE}/users/${userId}/favorite-advice`, {
        advice_id: advice.id,
        advice_text: advice.advice,
    });
};


export const removeFavoriteAdvice = async (userId, advice_id) => {
    const response = await axios.delete(`${API_BASE}/users/${userId}/favorite-advice/${advice_id}`);
    return response.data;
};





export const loginUser = async (username, password) => {
    const response = await axios.post(`${API_BASE}/login`, {
        username,
        password,
    });
    return response.data;
};

export const getQuoteDetails = async (quoteId) => {
    const response = await axios.get(`${API_BASE}/quotes/${quoteId}`);
    return response.data;
};

export const getAdviceDetails = async (adviceId) => {
    const response = await axios.get(`${API_BASE}/advice/${adviceId}`);
    return response.data;
};