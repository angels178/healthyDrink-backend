const validateRecipe = (req, res, next) => {
  const body = req.body;

  if (!body.name && !body.description && !body.ingredients) {
    res.status(400).json({
      payload:
        "what is the name of the recipe you are going to share? Come share with us!",
    });
  } else {
    next();
  }
};

module.exports = { validateRecipe };
