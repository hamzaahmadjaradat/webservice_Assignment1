import express from 'express';
import {checkEmailExists, checkUsernameExists, loginUser, registerUser} from '../controllers/userController.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', registerUser);
router.get('/check-username/:username', checkUsernameExists);
router.get('/check-email/:email', checkEmailExists);

export default router;
