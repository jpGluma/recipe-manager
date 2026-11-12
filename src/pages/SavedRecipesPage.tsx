
import { useState } from "react";
import { useCategories } from "../features/meals/meals.hooks";
import { useSavedRecipes } from "../features/recipes/recipes.hooks";
import type { SavedRecipe } from "../features/recipes/recipes.types";
import CategoryFilter from "../components/CategoryFilter";
import RecipeList from "../components/RecipeList";
import SummaryBar from "../components/SummaryBar";
import EditRecipeForm from "../components/EditRecipeForm";

export default function SavedRecipesPage() {
  const [filter, setFilter] = useState("All");
  const [editing, setEditing] = useState<SavedRecipe | null>(null);

  const categories = useCategories();

  const {
    query,
    saved,
    favoriteCount,
    update,
    remove,
    toggleFavorite,
  } = useSavedRecipes();

  const visible =
    filter === "All"
      ? saved
      : saved.filter((recipe) => recipe.category === filter);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <header className="text-center">
        <h1 className="text-4xl font-bold">Saved Recipes</h1>
        <p className="text-base-content/70 mt-2">
          Manage your saved recipes and favorites.
        </p>
      </header>

      <SummaryBar total={saved.length} favorites={favoriteCount} />

      <CategoryFilter
        categories={categories.data ?? []}
        activeFilter={filter}
        onFilterChange={setFilter}
      />

      {query.isPending && (
        <div className="text-center py-12">
          <span className="loading loading-spinner loading-lg" />
        </div>
      )}

      {query.isError && (
        <div className="alert alert-error">
          <span>Could not reach the recipe API. Check JSON Server.</span>
        </div>
      )}

      {query.data && (
        <RecipeList
          recipes={visible}
          onToggleFavorite={toggleFavorite}
          onEdit={setEditing}
          onDelete={remove.mutate}
          deletingId={remove.isPending ? (remove.variables ?? null) : null}
        />
      )}

      {editing && (
        <div className="modal modal-open">
          <div className="modal-box">
            <EditRecipeForm
              recipe={editing}
              onSave={(patch) => {
                update.mutate(patch, {
                  onSuccess: () => setEditing(null),
                });
              }}
              onCancel={() => setEditing(null)}
              isSaving={update.isPending}
            />
          </div>
        </div>
      )}
    </div>
  );
}
