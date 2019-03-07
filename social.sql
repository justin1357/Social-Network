DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL primary key,
    first VARCHAR(100) not null,
    last VARCHAR(100) not null,
    email VARCHAR(100) not null UNIQUE,
    password VARCHAR(100) not null,
    image VARCHAR(300),
    bio VARCHAR(300)
);
