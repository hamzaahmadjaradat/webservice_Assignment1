import * as Favorites from '../models/favoritesModel.js';

export const getFavorites = async (req, res) => {
    try {
        const favorites = await Favorites.getFavoritesByUser(req.params.id);
        res.json(favorites);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch favorites' });
    }
};

export const addFavorite = async (req, res) => {
    const { quote_id, body, author } = req.body;
    const userId = req.params.id;

    try {
        await Favorites.addQuote(quote_id, body, author);
        await Favorites.addFavorite(userId, quote_id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save favorite' });
    }
};

export const removeFavorite = async (req, res) => {
    const { id: userId, quote_id } = req.params;
    try {
        await Favorites.removeFavorite(userId, quote_id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Failed to remove favorite' });
    }
};


export const getQuoteById = async (req, res) => {
    try {
        const quote = await Favorites.findQuoteById(req.params.id);
        if (!quote) return res.status(404).json({ message: 'Quote not found' });
        res.json(quote);
    } catch (err) {
        console.error('Quote error:', err);
        res.status(500).json({ message: 'Error retrieving quote' });
    }
};





