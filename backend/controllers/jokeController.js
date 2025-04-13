import axios from 'axios';
import {
    createJoke,
    addFavoriteJoke,
    removeFavoriteJoke,
    getUserFavoriteJokes,
} from '../models/jokeModel.js';

export const fetchRandomJoke = async (req, res) => {
    try {
        const response = await axios.get('https://icanhazdadjoke.com/', {
            headers: { Accept: 'application/json' }
        });

        const joke = response.data;
        await createJoke(joke);

        res.json(joke);
    } catch (error) {
        console.error('Error fetching joke:', error);
        res.status(500).json({ message: 'Failed to fetch joke' });
    }
};

export const favoriteJoke = async (req, res) => {
    const { userId, joke_id, joke_text } = req.body;

    if (!userId || !joke_id || !joke_text) {
        return res.status(400).json({ message: 'Missing userId, joke_id, or joke_text' });
    }

    try {
        // Step 1: create joke if not exists
        await createJoke({ id: joke_id, joke: joke_text });

        // Step 2: add to favorite_jokes
        await addFavoriteJoke(userId, joke_id);

        res.status(200).json({ message: 'Joke favorited' });
    } catch (err) {
        console.error('Favorite joke error:', err);
        res.status(500).json({ message: 'Error favoriting joke' });
    }
};

export const unfavoriteJoke = async (req, res) => {
    const { userId, jokeId } = req.params;

    try {
        await removeFavoriteJoke(userId, jokeId);
        res.json({ message: 'Joke unfavorited' });
    } catch (err) {
        console.error('Unfavorite joke error:', err);
        res.status(500).json({ message: 'Error unfavoriting joke' });
    }
};

export const getFavorites = async (req, res) => {
    const { userId } = req.params;
    try {
        const jokes = await getUserFavoriteJokes(userId);
        res.json(jokes);
    } catch (err) {
        console.error('Get favorites error:', err);
        res.status(500).json({ message: 'Error getting favorite jokes' });
    }
};
