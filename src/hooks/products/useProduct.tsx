import { useQuery } from "@tanstack/react-query";

import { client } from "../../../supabase/client";
import {
  getProductDetail,
  getProductSearch,
  getProducts,
  getProductsByUser,
  getProductsPromotions,
} from "../../services";

const getProductsByCategory = async (category: number) => {
  try {
    if (typeof category !== "number" && category !== null) {
      throw new Error("La categoría no es un número válido.");
    }

    const { data } = await client
      .from("Product")
      .select("id")
      .eq("category", category);

    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const useProducts = () => {
  const queryProduct = useQuery(["products"], getProducts);
  return { queryProduct };
};

export const useProductDetail = (id: string) => {
  const queryProduct = useQuery(["productDetail", id], () =>
    getProductDetail(id)
  );
  return queryProduct;
};

export const useProductSearch = (value: string) => {
  const queryProduct = useQuery(["productDetail", value], () =>
    getProductSearch(value)
  );
  return { queryProduct };
};

export const useProductByCategory = (id: number) => {
  const queryProduct = useQuery(["productDetail", id], () =>
    getProductsByCategory(id)
  );
  return { queryProduct };
};

export const useProductsPromotions = (ad: string) => {
  const queryProduct = useQuery(["productsPromotions", ad], () =>
    getProductsPromotions(ad)
  );
  return { queryProduct };
};

export const useProductsByUser = (user: string) => {
  const queryProductByUser = useQuery(
    ["productsPromotions", user],
    () => getProductsByUser(user)
  );
  return queryProductByUser;
};
