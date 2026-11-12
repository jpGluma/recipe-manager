
import { savedRecipesApi } from "../../lib/api";
import type {
  SavedRecipe,
  NewRecipe,
  RecipePatch,
} from "./recipes.types";

type ApiRecipe = Omit<SavedRecipe, "id"> & {
  id: string | number;
};

function normalizeRecipe(recipe: ApiRecipe): SavedRecipe {
  return {
    ...recipe,
    id: String(recipe.id),
    ingredients: recipe.ingredients ?? [],
    measures: recipe.measures ?? [],
    instructions: recipe.instructions ?? "",
  };
}

// GET: Retrieve saved recipes from JSON Server
export const getRecipes = async (): Promise<SavedRecipe[]> => {
  const response = await savedRecipesApi.get<ApiRecipe[]>("/recipes");
  return response.data.map(normalizeRecipe);
};

// POST: Save a new recipe
export const createRecipe = async (
  recipe: NewRecipe
): Promise<SavedRecipe> => {
  const response = await savedRecipesApi.post<ApiRecipe>(
    "/recipes",
    recipe
  );

  return normalizeRecipe(response.data);
};

// PATCH: Update an existing recipe
export const updateRecipe = async ({
  id,
  ...patch
}: RecipePatch): Promise<SavedRecipe> => {
  const response = await savedRecipesApi.patch<ApiRecipe>(
    `/recipes/${id}`,
    patch
  );

  return normalizeRecipe(response.data);
};

// DELETE: Remove a saved recipe
export const deleteRecipe = async (
  id: string
): Promise<{ id: string }> => {
  await savedRecipesApi.delete(`/recipes/${id}`);
  return { id };
};
