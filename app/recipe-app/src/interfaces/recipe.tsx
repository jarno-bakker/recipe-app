export interface Recipe {
  _id?: string;
  title: string;
  ingredients: string;
  steps: string;
  image_ingredients: File | undefined;
  image_recipe: File | undefined;
  password?: string;
}
