
import axios from "axios";

const mealdbURL = import.meta.env.VITE_MEALDB_URL;
const savedRecipesURL = import.meta.env.VITE_API_URL;

if (!mealdbURL) {
  throw new Error(
    "VITE_MEALDB_URL is not set. Copy .env.example to .env."
  );
}

if (!savedRecipesURL) {
  throw new Error(
    "VITE_API_URL is not set. Check your .env file."
  );
}

// TheMealDB API
export const mealdb = axios.create({
  baseURL: mealdbURL,
});

// Local JSON Server API
export const savedRecipesApi = axios.create({
  baseURL: savedRecipesURL,
});
