import { useQuery } from "@tanstack/react-query";
import { getTypeProduct } from "../../services";

export const useTypeProduct = (name: string) => {
  const queryTypeProduct = useQuery(["type-product"], () =>
    getTypeProduct(name)
  );
  return queryTypeProduct;
};
