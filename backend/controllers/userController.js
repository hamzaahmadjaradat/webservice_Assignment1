import { findUserByUsername } from '../models/userModel.js';

export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    console.log('Received login:', username, password); // 🧠 LOG THIS

    try {
        const user = await findUserByUsername(username);
        console.log('User from DB:', user); // 🧠 LOG THIS

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        res.json({ id: user.id, username: user.username });
    } catch (err) {
        console.error('Login error in backend:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
