import axios from 'axios';

const API_BASE = 'http://localhost:3000/api';

//USER
export const loginUser = async (username, password) => {
    const response = await axios.post(`${API_BASE}/login`, {
        username,
        password,
    });
    return response.data;
};

export const signupUser = async (username, email, password) => {
    const response = await axios.post(`${API_BASE}/signup`, {
        username,
        email,
        password,
    });
    return response.data;
};

export const checkUsernameExists = async (username) => {
    const response = await axios.get(`${API_BASE}/check-username/${username}`);
    return response.data;
};

export const checkEmailExists = async (email) => {
    const response = await axios.get(`${API_BASE}/check-email/${email}`);
    return response.data;
};

//QUOTES
export const getUserFavorites = async (userId) => {
    const response = await axios.get(`${API_BASE}/users/${userId}/favorites`);
    return response.data;
};

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

export const getQuoteDetails = async (quoteId) => {
    const response = await axios.get(`${API_BASE}/quotes/${quoteId}`);
    return response.data;
};

export const fetchQuotesFromFavQs = async (pageNumber = 1) => {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = `https://favqs.com/api/quotes/?page=${pageNumber}`;

    const response = await axios.get(proxyUrl + apiUrl, {
        headers: {
            'Authorization': 'Token token=ec16f3527892be13e370ae43ead86439',
            'Content-Type': 'application/json'
        }
    });

    return response.data;
};


//ADVICE

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

export const getAdviceDetails = async (adviceId) => {
    const response = await axios.get(`${API_BASE}/advice/${adviceId}`);
    return response.data;
};

export const fetchRandomAdvice = async () => {
    const response = await axios.get('https://api.adviceslip.com/advice', {
        headers: { 'Accept': 'application/json' }
    });
    return response.data.slip;
};

export const searchAdviceByTerm = async (term) => {
    const response = await axios.get(`https://api.adviceslip.com/advice/search/${term}`);
    return response.data;
};


//JOKES
export const fetchRandomJoke = async () => {
    const response = await axios.get('https://icanhazdadjoke.com/', {
        headers: { Accept: 'application/json' }
    });
    return response.data;
};

export const addFavoriteJoke = async (userId, joke) => {
    const response = await axios.post(`${API_BASE}/jokes/favorite`, {
        userId,
        joke_id: joke.id,
        joke_text: joke.joke
    });
    return response.data;
};

export const removeFavoriteJoke = async (userId, jokeId) => {
    const response = await axios.delete(`${API_BASE}/users/${userId}/favorite-jokes/${jokeId}`);
    return response.data;
};

export const getFavoriteJokes = async (userId) => {
    const response = await axios.get(`${API_BASE}/users/${userId}/favorite-jokes`);
    return response.data;
};
