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
  const recipes = await getAllRecipes();

  if (recipes) {
    res.status(200).json({ payload: recipes });
  } else {
    res.status(404).json({ payload: error });
  }
});

recipe.get("/:id", async (req, res) => {
  const { id } = req.params;
  

  try {
    const recipe = await getSingleRecipe(id);

    res.status(200).json({ payload: recipe[0] });
  } catch (error) {
    res.status(404).json({ payload: error });
  }
});

recipe.post("/", validateRecipe, async (req, res) => {
  const body = req.body;
  console.log("Received request body:", body);
  try {
    const recipe = await createRecipe(body);

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


recipe.put('/:id', async (req, res)=>{
  const updateRecipe = await updateRecipeById(req.params.id, req.params.body)

  try {
    res.status(200).json({payload: updateRecipe})
  } catch (error) {
    res.status(404).json({payload: error})
  }
})

module.exports = recipe;
