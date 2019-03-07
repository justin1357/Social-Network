var spicedPg = require("spiced-pg");

var db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/social"
);

module.exports.register = function register(
    firstname,
    lastname,
    email,
    password
) {
    return db.query(
        "INSERT INTO users(first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING id",
        [firstname, lastname, email, password]
    );
};

module.exports.getEmail = function getEmail(email) {
    return db.query(`SELECT password, id FROM users WHERE email = $1`, [email]);
};

module.exports.getUser = function getUser(id) {
    return db.query(`SELECT first, last, id, image FROM users WHERE id = $1`, [
        id
    ]);
};

module.exports.uploadProfilePic = function uploadProfilePic(url, id) {
    return db.query(
        `UPDATE users SET image = ($1) WHERE id = ($2) RETURNING image`,
        [url, id]
    );
};
