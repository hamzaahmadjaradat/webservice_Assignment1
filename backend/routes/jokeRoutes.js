import express from 'express';
import {
    fetchRandomJoke,
    favoriteJoke,
    unfavoriteJoke,
    getFavorites
} from '../controllers/jokeController.js';

const router = express.Router();

router.get('/jokes/random', fetchRandomJoke);
router.post('/jokes/favorite', favoriteJoke);
router.delete('/users/:userId/favorite-jokes/:jokeId', unfavoriteJoke);
router.get('/users/:userId/favorite-jokes', getFavorites);


export default router;
