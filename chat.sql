DROP TABLE IF EXISTS chat;

CREATE TABLE chat (
    id SERIAL primary key,
    sender INT NOT NULL REFERENCES users(id),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
