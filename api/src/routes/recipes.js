const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe");
const Image = require("../models/image");
const isAuthorized = require("../middleware/authorization");
const { uploadToGridFS } = require("../utils/gridfs");

// Get all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single recipe
router.get("/:id", getRecipe, async (req, res) => {
  res.json(res.recipe);
});

// Create a new recipe
router.post("/", isAuthorized, async (req, res) => {
  try {
    // Upload de afbeeldingen naar GridFS
    console.log(req.body.image_ingredients);
    const ingredientsImageId = await uploadToGridFS(req.body.image_ingredients);
    const recipeImageId = await uploadToGridFS(req.body.image_recipe);

    console.log("hopla", ingredientsImageId);

    // Maak een nieuw recept aan met de afbeelding ObjectIDs
    const recipe = new Recipe({
      title: req.body.title,
      ingredients: req.body.ingredients,
      steps: req.body.steps,
      image_ingredients_id: ingredientsImageId,
      image_recipe_id: recipeImageId,
    });

    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a recipe
router.put("/:id", isAuthorized, getRecipe, async (req, res) => {
  if (req.body.title != null) {
    res.recipe.title = req.body.title;
  }

  if (req.body.ingredients != null) {
    res.recipe.ingredients = req.body.ingredients;
  }

  if (req.body.steps != null) {
    res.recipe.steps = req.body.steps;
  }

  try {
    // Als er een nieuwe afbeelding is geüpload, upload deze dan naar GridFS en update de ObjectID
    if (req.body.image_ingredients) {
      res.recipe.image_ingredients_id = await uploadToGridFS(req.body.image_ingredients);
    }

    if (req.body.image_recipe) {
      res.recipe.image_recipe_id = await uploadToGridFS(req.body.image_recipe);
    }

    const updatedRecipe = await res.recipe.save();
    res.json(updatedRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a recipe
router.delete("/:id", isAuthorized, getRecipe, async (req, res) => {
  try {
    // Verwijder de bijbehorende afbeeldingen uit GridFS
    await Image.findByIdAndDelete(res.recipe.image_ingredients_id);
    await Image.findByIdAndDelete(res.recipe.image_recipe_id);

    await res.recipe.remove();
    res.json({ message: "Recipe deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getRecipe(req, res, next) {
  let recipe;
  try {
    recipe = await Recipe.findById(req.params.id);
    if (recipe == null) {
      return res.status(404).json({ message: "Cannot find recipe" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.recipe = recipe;
  next();
}

module.exports = router;
