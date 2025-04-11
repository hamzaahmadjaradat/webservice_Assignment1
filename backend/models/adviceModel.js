import db from '../config/db.js';

export const getFavoriteAdviceByUser = async (userId) => {
    const [rows] = await db.promise().query(
        'SELECT * FROM favorite_advice WHERE user_id = ? ORDER BY created_at DESC',
        [userId]
    );
    return rows;
};

export const addAdvice = async (id, text) => {
    await db.promise().query(
        'INSERT IGNORE INTO advice (id, advice_text) VALUES (?, ?)',
        [id, text]
    );
};

export const addFavoriteAdvice = async (userId, adviceId) => {
    await db.promise().query(
        'INSERT IGNORE INTO favorite_advice (user_id, advice_id) VALUES (?, ?)',
        [userId, adviceId]
    );
};


export const removeFavoriteAdvice = async (userId, advice_id) => {
    await db.promise().query(
        'DELETE FROM favorite_advice WHERE user_id = ? AND advice_id = ?',
        [userId, advice_id]
    );
};


export const findAdviceById = async (id) => {
    const [rows] = await db.promise().query('SELECT * FROM advice WHERE id = ?', [id]);
    return rows[0];
};