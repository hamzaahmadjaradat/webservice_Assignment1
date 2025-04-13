import {createUser, findUserByEmail, findUserByUsername} from '../models/userModel.js';

export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await findUserByUsername(username);

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        res.json({ id: user.id, username: user.username });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser = await findUserByUsername(username);
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const existingEmail = await findUserByEmail(email);
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const result = await createUser({ username, email, password });
        res.status(201).json({ message: 'User created successfully', id: result.insertId });
    } catch (error) {
        console.error('Register Error:', error);
        res.status(500).json({ message: 'Failed to create user', error });
    }
};

export const checkUsernameExists = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await findUserByUsername(username);
        res.json({ exists: !!user });
    } catch (err) {
        console.error('Username check error:', err);
        res.status(500).json({ message: 'Server error checking username' });
    }
};

export const checkEmailExists = async (req, res) => {
    const { email } = req.params;
    try {
        const user = await findUserByEmail(email);
        res.json({ exists: !!user });
    } catch (err) {
        console.error('Email check error:', err);
        res.status(500).json({ message: 'Server error checking email' });
    }
};
