
import type { Recipe } from "../meals/meals.types";

/** A saved recipe stored in localStorage. */
export interface SavedRecipe extends Recipe {
  id: string;
}

/** Data required to create a new recipe. */
export type NewRecipe = Recipe;

/** Data used to update an existing recipe. */
export type RecipePatch = {
  id: string;
} & Partial<Omit<SavedRecipe, "id">>;
