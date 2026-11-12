
import { Link, useParams } from "react-router-dom";
import { useMeal } from "../features/meals/meals.hooks";
import { useSavedRecipes } from "../features/recipes/recipes.hooks";

export default function RecipeDetailsPage() {
  const { mealId } = useParams<{ mealId: string }>();
  const meal = useMeal(mealId ?? "");

  const {
    savedMealIds,
    create,
  } = useSavedRecipes();

  if (meal.isLoading) {
    return (
      <div className="text-center py-16">
        <span className="loading loading-spinner loading-lg" />
        <p className="mt-3">Loading recipe...</p>
      </div>
    );
  }

  if (meal.isError) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold">
          Could not load recipe
        </h2>
        <Link to="/" className="btn btn-primary mt-4">
          Back to Search
        </Link>
      </div>
    );
  }

  if (!meal.data) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold">
          Recipe not found
        </h2>
        <Link to="/" className="btn btn-primary mt-4">
          Back to Search
        </Link>
      </div>
    );
  }

  const recipe = meal.data;
  const isSaved = savedMealIds.has(recipe.mealId);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <Link to="/" className="btn btn-outline btn-sm">
        ← Back to Search
      </Link>

      <div className="card bg-base-100 shadow-xl overflow-hidden">
        <figure>
          <img
            src={recipe.thumb}
            alt={recipe.title}
            className="w-full max-h-96 object-cover"
          />
        </figure>

        <div className="card-body">
          <h1 className="text-3xl font-bold">
            {recipe.title}
          </h1>

          <div className="flex gap-2">
            <span className="badge badge-primary">
              {recipe.category}
            </span>
            <span className="badge badge-outline">
              {recipe.ingredients.length} Ingredients
            </span>
          </div>

          <button
            className="btn btn-primary mt-3"
            disabled={isSaved || create.isPending}
            onClick={() => create.mutate(recipe)}
          >
            {isSaved
              ? "✓ Recipe Saved"
              : create.isPending
              ? "Saving..."
              : "Save Recipe"}
          </button>

          <div className="divider" />

          <h2 className="text-xl font-bold">
            Ingredients
          </h2>

          <ul className="list-disc list-inside space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={`${ingredient}-${index}`}>
                {recipe.measures?.[index]
                  ? `${recipe.measures[index]} ${ingredient}`
                  : ingredient}
              </li>
            ))}
          </ul>

          <div className="divider" />

          <h2 className="text-xl font-bold">
            Instructions
          </h2>

          <p className="whitespace-pre-line leading-relaxed">
            {recipe.instructions || "No instructions available."}
          </p>
        </div>
      </div>
    </div>
  );
}
