export interface Recipe {
  title: string;
  ingredients: string;
  steps: string;
  image_ingredients?: File;
  image_ingredients_id?: string;
  image_recipe?: File;
  image_recipe_id?: string;
  password: string;
}