import db from '../config/db.js';

export const findUserByUsername = (username) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]); // return single user
        });
    });
};
