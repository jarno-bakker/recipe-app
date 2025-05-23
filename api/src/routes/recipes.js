const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe");
const isAuthorized = require("../middleware/authorization");
const multer = require("multer");
const { CloudflareStorage } = require("multer-cloudflare-storage");

let upload = multer({
  storage: new CloudflareStorage(
    process.env.CLOUDFLARE_ACCOUNT_ID,
    process.env.CLOUDFLARE_API_KEY
  ),
});

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
router.get("/:id", getRecipe, (req, res) => {
  res.json(res.recipe);
});

// Create a new recipe
router.post(
  "/",
  upload.fields([
    { name: "image_ingredients", maxCount: 1 },
    { name: "image_recipe", maxCount: 1 },
  ]),
  async (req, res) => {
    if (req.body.password !== process.env.PASSWORD) {
      res.status(401).send("Wachtwoord verkeerd!");
    }

    const { image_ingredients, image_recipe } = req.files;

    const recipe = new Recipe({
      title: req.body.title,
      ingredients: req.body.ingredients,
      steps: req.body.steps,
      image_ingredients: image_ingredients[0].path,
      image_recipe: image_recipe[0].path,
    });

    try {
      const newRecipe = await recipe.save();
      res.status(201).json(newRecipe);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

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

  if (req.body.image_ingredients != null) {
    res.recipe.image_ingredients = req.body.image_ingredients;
  }

  if (req.body.image_recipe != null) {
    res.recipe.image_recipe = req.body.image_recipe;
  }

  try {
    const updatedRecipe = await res.recipe.save();
    res.json(updatedRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a recipe
router.delete("/:id", isAuthorized, async (req, res) => {
  Recipe.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "Deleted!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
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
