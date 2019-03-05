DROP TABLE IF EXISTS users;

CREATE TABLE social (
    id SERIAL primary key,
    first VARCHAR(100) not null,
    last VARCHAR(100) not null,
    email VARCHAR(100) not null UNIQUE,
    password VARCHAR(100) not null
);
