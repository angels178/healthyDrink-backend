const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const recipeController = require("./controllers/recipeController");

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/recipes", recipeController);

app.get("/", (req, res) => {
  res.send("Welcome to Love Cusine Recipes");
});

app.get("*", (req, res) => {
  res.status(404).send("Page not found!");
});

module.exports = app;
