import express from 'express';
import {
    getFavorites,
    addFavorite,
    removeFavorite,
    getQuoteById

} from '../controllers/quoteController.js';

const router = express.Router();

router.get('/users/:id/favorites', getFavorites);
router.post('/users/:id/favorites', addFavorite);
router.delete('/users/:id/favorites/:quote_id', removeFavorite);
router.get('/quotes/:id', getQuoteById);


export default router;
