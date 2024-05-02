const db = require("../db/dbConfig");

const getAllRecipes = async () => {
  try {
    const getRecipes = await db.any(`select * from recipes`);

    return getRecipes;
  } catch (error) {
    return error;
  }
};

const getSingleRecipe = async (id) => {
  try {
    const recipe = await db.one(`select * from recipes where id = $1`, id);

    return recipe;
  } catch (error) {
    return error;
  }
};

const createRecipe = async ({
  name,
  description,
  ingredients,
  prep_time,
  cooking_time,
  serving,
}) => {
  try {
    const recipe = await db.one(
      `insert into recipes (name, description, ingredients, prep_time, cooking_time, serving) values($1, $2, $3, $4, $5, $6) returning *`,
      [name, description, ingredients, prep_time, cooking_time, serving]
    );

    return recipe;
  } catch (error) {
    return error;
  }
};

const deleteRecipeById = async (id) => {
  try {
    const deleteRecipe = await db.one(
      `delete from recipes where id = $1 returning *`,
      id
    );

    return deleteRecipe;
  } catch (error) {
    return error;
  }
};

const updateRecipeById = async (id, body) => {
  const { name, description, ingredients, prep_time, cooking_time, serving } =
    body;
  try {
    const updateRecipe = await db.any(
      `update recipes set name = $1, description = $2, ingredients = $3, prep_time = $4, cooking_time = $5, serving = $6 where id = $7 returning *`,
      [name, description, ingredients, prep_time, cooking_time, serving, id]
    );

    return updateRecipe;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllRecipes,
  getSingleRecipe,
  createRecipe,
  deleteRecipeById,
  updateRecipeById,
};
