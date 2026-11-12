
import type { SavedRecipe } from "../features/recipes/recipes.types";

interface RecipeCardProps {
  recipe: SavedRecipe;
  onToggleFavorite: (recipe: SavedRecipe) => void;
  onEdit: (recipe: SavedRecipe) => void;
  onDelete: (id: SavedRecipe["id"]) => void;
  isDeleting: boolean;
}

export default function RecipeCard({
  recipe,
  onToggleFavorite,
  onEdit,
  onDelete,
  isDeleting,
}: RecipeCardProps) {
  const { id, title, category, thumb, time, notes, favorite } = recipe;

  return (
    <article className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="card-body p-4">
        <div className="flex gap-4 items-start">
          {thumb && (
            <img
              src={thumb}
              alt={title}
              className="w-28 h-28 rounded-xl object-cover shadow-sm shrink-0"
            />
          )}

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start gap-2">
              <h2 className="font-bold text-lg leading-tight">
                {title}
              </h2>

              <button
                className={`btn btn-circle btn-sm ${
                  favorite
                    ? "bg-rose-100 text-rose-600 border-rose-200"
                    : "btn-ghost text-base-content/60"
                }`}
                onClick={() => onToggleFavorite(recipe)}
                aria-label={favorite ? "Unfavorite" : "Favorite"}
              >
               <span className="text-2xl">
                  {favorite ? "★" : "☆"}
                </span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              <span className="badge bg-emerald-100 text-emerald-800 border-0 font-medium">
                {category}
              </span>

              <span className="badge badge-ghost gap-1">
                <span>◷</span>
                {time} min
              </span>
            </div>
          </div>
        </div>

        {notes && (
          <p className="text-sm text-base-content/70 italic mt-3 border-l-2 border-emerald-400 pl-3">
            {notes}
          </p>
        )}

        <div className="card-actions justify-end mt-4 pt-3 border-t border-base-200">
          <button
            className="btn btn-sm btn-outline border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:border-emerald-600 hover:text-white"
            onClick={() => onEdit(recipe)}
          >
            Edit
          </button>

          <button
            className="btn btn-sm btn-error text-white"
            onClick={() => onDelete(id)}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </article>
  );
}
