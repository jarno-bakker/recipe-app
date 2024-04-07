const mongoose = require("mongoose");

const Recipe = mongoose.model(
  "Recipe",
  new mongoose.Schema({
    title: { type: String, required: true },
    ingredients: [{ ingredient: { type: String, required: true } }],
    steps: [{ step: { type: String, required: true } }],
  })
);

module.exports = Recipe;
