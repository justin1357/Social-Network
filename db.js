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
    return db.query(`SELECT * FROM users WHERE id = $1`, [id]);
};

module.exports.uploadProfilePic = function uploadProfilePic(url, id) {
    return db.query(
        `UPDATE users SET image = ($1) WHERE id = ($2) RETURNING image`,
        [url, id]
    );
};

module.exports.uploadBio = function uploadBio(text, id) {
    return db.query(
        `UPDATE users SET bio = ($1) WHERE id = ($2) RETURNING bio`,
        [text, id]
    );
};

module.exports.getStatus = function getStatus(myId, otherUserId) {
    return db.query(
        `SELECT * FROM friends WHERE (receiver = $1 AND sender = $2)
        OR (receiver = $2 AND sender = $1)`,
        [myId, otherUserId]
    );
};

module.exports.sendFriendRequest = function sendFriendRequest(
    myId,
    otherUserId
) {
    return db.query(`INSERT INTO friends( sender, receiver) VALUES ($1, $2)`, [
        myId,
        otherUserId
    ]);
};

module.exports.deleteFriendRequest = function deleteFriendRequest(
    myId,
    otherUserId
) {
    return db.query(
        `DELETE FROM friends WHERE (sender = $1 AND receiver = $2) OR (receiver = $1 AND sender = $2)`,
        [myId, otherUserId]
    );
};

module.exports.acceptFriendRequest = function acceptFriendRequest(
    myId,
    otherUserId
) {
    return db.query(
        `UPDATE friends SET accepted = true WHERE (sender = $2 AND receiver = $1)`,
        [myId, otherUserId]
    );
};
