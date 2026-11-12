
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import SearchPage from "./pages/SearchPage";
import SavedRecipesPage from "./pages/SavedRecipesPage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<SearchPage />} />
        <Route path="/saved" element={<SavedRecipesPage />} />
        <Route
          path="/recipe/:mealId"
          element={<RecipeDetailsPage />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
