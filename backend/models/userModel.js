import db from '../config/db.js';

export const findUserByUsername = (username) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

export const createUser = async (user) => {
    const sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
    const [result] = await db.promise().execute(sql, [
        user.username,
        user.email,
        user.password
    ]);
    return result.insertId;
};

export const findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};
