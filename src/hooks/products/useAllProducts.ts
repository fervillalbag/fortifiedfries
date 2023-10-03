import { useQuery } from "@tanstack/react-query";
import { axios } from "../../config";

const getAllProducts = async () => {
  try {
    const products = await axios.get("/product/card");
    return products;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const useAllProducts = () => {
  const queryProduct = useQuery(["products-by-card"], getAllProducts);
  return { queryProduct };
};
