DROP DATABASE IF EXISTS love_cusine_recipes_dev;

CREATE DATABASE love_cusine_recipes_dev;

\c love_cusine_recipes_dev;

CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    ingredients TEXT NOT NULL,
    prep_time TEXT,
    cooking_time TEXT, 
    serving INT
);