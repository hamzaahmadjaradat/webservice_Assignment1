import express from 'express';
import {
    getFavorites,
    addFavorite,
    removeFavorite, getAdviceById
} from '../controllers/adviceController.js';

const router = express.Router();

router.get('/users/:id/favorite-advice', getFavorites);
router.post('/users/:id/favorite-advice', addFavorite);
router.delete('/users/:id/favorite-advice/:advice_id', removeFavorite);
router.get('/advice/:id', getAdviceById);

export default router;
