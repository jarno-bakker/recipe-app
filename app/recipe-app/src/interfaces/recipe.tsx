export interface Recipe {
  _id?: string;
  title: string;
  ingredients: string;
  steps: string;
  image_ingredients: string | ArrayBuffer | null;
  image_recipe: string | ArrayBuffer | null;
  password?: string;
}
