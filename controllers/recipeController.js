const express = require("express");
const recipe = express.Router();

const {
  getAllRecipes,
  getSingleRecipe,
  createRecipe,
  deleteRecipeById,
  updateRecipeById,
} = require("../queries/recipes");

const { validateRecipe } = require("../validations/checkRecipes");

recipe.get("/", async (req, res) => {
  try {
    const recipes = await getAllRecipes();
    res.status(200).json({ payload: recipes });
  } catch (error) {
    res.status(404).json({ payload: error });
  }
});

recipe.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await getSingleRecipe(id);

    res.status(200).json({ payload: recipe });
  } catch (error) {
    res.status(404).json({ payload: error });
  }
});

recipe.post("/", async (req, res) => {
  const body = req.body;
  // console.log("Received request body:", body);
  const recipe = await createRecipe(body);
  console.log(recipe);
  try {
    res.status(201).json({ payload: recipe });
  } catch (error) {
    res.status(404).json({ payload: error });
  }
});

recipe.delete("/:id", async (req, res) => {
  const deleteRecipe = await deleteRecipeById(req.params.id);

  try {
    res.status(200).json({ payload: deleteRecipe });
  } catch (error) {
    res.status(404).json({ payload: error });
  }
});

recipe.put("/:id", validateRecipe, async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const updateRecipe = await updateRecipeById(id, body);
    console.log(req.body);
    res.status(200).json({ payload: updateRecipe });
  } catch (error) {
    res.status(404).json({ payload: error });
  }
});

module.exports = recipe;
