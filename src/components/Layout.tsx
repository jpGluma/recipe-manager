
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen bg-base-200">
      <nav className="navbar bg-base-100 shadow-md px-4">
        <div className="flex-1">
          <Link to="/" className="text-xl font-bold">
            🍳 Recipe Manager
          </Link>
        </div>

        <div className="flex gap-2">
          <Link to="/" className="btn btn-ghost">
            Search
          </Link>

          <Link to="/saved" className="btn btn-primary">
            Saved Recipes
          </Link>
        </div>
      </nav>

      <main className="py-6 px-4">
        <Outlet />
      </main>
    </div>
  );
}
