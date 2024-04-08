const mongoose = require("mongoose");

const Recipe = mongoose.model(
  "Recipe",
  new mongoose.Schema({
    title: { type: String, required: true },
    ingredients: { type: String, required: true },
    steps: { type: String, required: true },
    image_ingredients: { type: String, required: true },
    image_recipe: { type: String, required: true },
  })
);

module.exports = Recipe;
