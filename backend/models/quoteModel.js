import db from '../config/db.js';

export const getFavoritesByUser = async (userId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT quote_id FROM favorite_quotes WHERE user_id = ?', [userId], (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

export const addQuote = async (quote_id, body, author) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT IGNORE INTO quotes (id, body, author) VALUES (?, ?, ?)', [quote_id, body, author], (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
};

export const addFavorite = async (userId, quote_id) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT IGNORE INTO favorite_quotes (user_id, quote_id) VALUES (?, ?)', [userId, quote_id], (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
};

export const removeFavorite = async (userId, quote_id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM favorite_quotes WHERE user_id = ? AND quote_id = ?', [userId, quote_id], (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
};


export const findQuoteById = async (id) => {
    const [rows] = await db.promise().query(
        'SELECT * FROM quotes WHERE id = ?',
        [id]
    );
    return rows[0];
};
