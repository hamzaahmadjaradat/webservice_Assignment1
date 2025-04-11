import * as AdviceModel from '../models/adviceModel.js';
import {findAdviceById} from "../models/adviceModel.js";

export const getFavorites = async (req, res) => {
    try {
        const favorites = await AdviceModel.getFavoriteAdviceByUser(req.params.id);
        res.json(favorites);
    } catch (err) {
        res.status(500).json({ error: 'Failed to load favorite advice.' });
    }
};

export const addFavorite = async (req, res) => {
    const { advice_id, advice_text } = req.body;
    const userId = req.params.id;

    console.log('addFavorite request:', { userId, advice_id, advice_text });

    try {
        await AdviceModel.addAdvice(advice_id, advice_text);
        await AdviceModel.addFavoriteAdvice(userId, advice_id);
        res.json({ success: true });
    } catch (err) {
        console.error('Error in addFavorite:', err);
        res.status(500).json({ error: 'Failed to save advice.' });
    }
};





export const getAdviceById = async (req, res) => {
    try {
        const advice = await findAdviceById(req.params.id);
        if (!advice) return res.status(404).json({ message: 'Advice not found' });
        res.json(advice);
    } catch (err) {
        console.error('Advice error:', err);
        res.status(500).json({ message: 'Error retrieving advice' });
    }
};

export const removeFavorite = async (req, res) => {
    const { id, advice_id } = req.params;
    try {
        await AdviceModel.removeFavoriteAdvice(id, advice_id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Failed to remove advice.' });
    }
};
