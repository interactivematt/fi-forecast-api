DROP TABLE IF EXISTS cards;

CREATE TABLE cards (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    title TEXT NOT NULL,
    content TEXT NOT NULL
);