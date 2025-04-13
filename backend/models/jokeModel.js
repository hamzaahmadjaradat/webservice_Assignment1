import db from '../config/db.js';

export const createJoke = async (joke) => {
    const sql = `INSERT IGNORE INTO jokes (joke_id, joke_text) VALUES (?, ?)`;
    const [result] = await db.promise().execute(sql, [joke.id, joke.joke]);
    return result;
};


export const getJokeById = async (jokeId) => {
    const [rows] = await db.promise().query('SELECT * FROM jokes WHERE id = ?', [jokeId]);
    return rows[0];
};

export const getUserFavoriteJokes = async (userId) => {
    const [rows] = await db.promise().query(
        'SELECT j.joke_id, j.joke_text FROM jokes j JOIN favorite_jokes f ON j.joke_id = f.joke_id WHERE f.user_id = ?',
        [userId]
    );
    return rows;
};


export const addFavoriteJoke = async (userId, jokeId) => {
    const sql = `INSERT IGNORE INTO favorite_jokes (user_id, joke_id) VALUES (?, ?)`;
    const [result] = await db.promise().execute(sql, [userId, jokeId]);
    return result;
};

export const removeFavoriteJoke = async (userId, jokeId) => {
    const sql = `DELETE FROM favorite_jokes WHERE user_id = ? AND joke_id = ?`;
    const [result] = await db.promise().execute(sql, [userId, jokeId]);
    return result;
};
