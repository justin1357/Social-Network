DROP TABLE IF EXISTS friends;

CREATE TABLE friends (
    id SERIAL primary key,
    receiver INT NOT NULL REFERENCES users(id),
    sender INT NOT NULL REFERENCES users(id),
    accepted BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
