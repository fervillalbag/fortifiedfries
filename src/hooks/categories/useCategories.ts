import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../services/categories";

export type CategoryProps = {
  id: number;
  name: string;
};

export const useCategories = () => {
  const queryCategory = useQuery(["user"], getAllCategories);
  return { queryCategory };
};
