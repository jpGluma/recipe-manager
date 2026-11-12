
import { useQuery } from "@tanstack/react-query";
import { searchMeals, getCategories } from "./meals.api";

// TODO 6 — Search TheMealDB
export function useSearchMeals(term: string) {
  return useQuery({
    queryKey: ["meals", term],
    queryFn: () => searchMeals(term),
    enabled: term.length > 0,
  });
}

// TODO 7 — Get categories
export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
}
