const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: { type: String, required: true },
  steps: { type: String, required: true },
  image_ingredients_id: { type: mongoose.Schema.Types.ObjectId, ref: "Image" }, // Verwijzing naar GridFS-upload voor ingrediëntenafbeelding
  image_recipe_id: { type: mongoose.Schema.Types.ObjectId, ref: "Image" }, // Verwijzing naar GridFS-upload voor receptafbeelding
});

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;
