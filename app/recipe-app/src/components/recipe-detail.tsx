import React, { useState, useEffect } from "react";
import axios from "axios";
import { Recipe } from "../interfaces/recipe";
import { useLocation } from "react-router-dom";

function RecipeDetail() {
  const location = useLocation();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/recipes/${charactersAfterLastSlash(
            location.pathname
          )}`
        );
        setRecipe(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [location.pathname]);

  // Functie om alleen de tekens na de laatste "/" te krijgen
  function charactersAfterLastSlash(str: string) {
    const lastIndex = str.lastIndexOf("/");
    return str.substring(lastIndex + 1);
  }

  if (!recipe) {
    return null; // Laadindicator kan hier worden toegevoegd terwijl de data wordt opgehaald
  }

  return (
    <>
      {/* Toon de afbeelding van het recept */}
      {recipe.image_recipe_id && (
        <img
          src={`${import.meta.env.VITE_BASE_URL}/images/${recipe.image_recipe_id}`}
          alt="Recipe"
        />
      )}

      <div className="container">
        <h1>{recipe.title}</h1>
        <p>Ingrediënten: {recipe.ingredients}</p>
        <p>Stappen: {recipe.steps}</p>
      </div>
    </>
  );
}

export default RecipeDetail;
