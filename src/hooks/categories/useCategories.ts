import { useQuery } from "@tanstack/react-query";
import { getCategories, getSubCategories } from "../../services";

export const useCategories = () => {
  const queryCategory = useQuery(["categories"], getCategories);
  return queryCategory;
};

export const useSubCategories = (id: string) => {
  const querySubCategory = useQuery(["sub-categories", id], () =>
    getSubCategories(id)
  );
  return querySubCategory;
};
