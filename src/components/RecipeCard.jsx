export default function RecipeCard({ recipe, onToggleFavorite, onDelete }) {
  // TODO: destructure id, title, category, time, favorite from recipe.
  const { id, title, category, time, favorite } = recipe;

  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body">
        <div className="flex justify-between items-start">
          <h2 className="card-title">{title}</h2>

          <button
            className="btn btn-ghost btn-sm"
            onClick={() => onToggleFavorite(id)}
          >
            {favorite ? "★" : "☆"}
          </button>
        </div>

        <div className="flex gap-2 mt-1">
          {/* TODO: category badge (badge badge-primary) */}
          <div className="badge badge-primary">{category}</div>

          {/* TODO: time badge (badge badge-ghost) — e.g., "45 min" */}
          <div className="badge badge-ghost">{time} min</div>
        </div>

        <div className="card-actions justify-end mt-3">
          {/* TODO: Delete button (btn btn-error btn-sm) that calls onDelete(id) */}
          <button
            className="btn btn-error btn-sm"
            onClick={() => onDelete(id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
