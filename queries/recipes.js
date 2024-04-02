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
    const recipe = await db.any(`select * from recipes where id = $1`, id);

    return recipe;
  } catch (error) {
    return error;
  }
};

const createRecipe = async ({ name, image_url, description }) => {
  try {
    const recipe = await db.one(
      `insert into recipes (title, image_url, description) values($1, $2, $3) returning *`,
      [name, image_url, description]
    );

    return recipe;
  } catch (error) {
    return error;
  }
};

const deleteRecipeById = async (id) => {
  try {
    const deleteRecipe = await db.any(
      `delete from recipes where id = $1 returning *`,
      id
    );

    return deleteRecipe;
  } catch (error) {
    return error;
  }
};

const updateRecipeById = async ({ id, name, image_url, description }) => {
  try {
    const updateRecipe = await db.any(
      `update recipe set title = $1, image_url = $2, description = $3 where id = $4 returning *`,
      [name, image_url, description, id]
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
