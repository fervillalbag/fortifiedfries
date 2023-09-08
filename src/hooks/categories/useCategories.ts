import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../services/categories";

export const useCategories = () => {
  const queryCategory = useQuery(["user"], getAllCategories);
  return { queryCategory };
};
