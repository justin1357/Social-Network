DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
    id SERIAL primary key,
    posted_by INT NOT NULL REFERENCES users(id),
    post TEXT,
    image VARCHAR(300),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
