import { useQuery } from "@tanstack/react-query";

import { client } from "../../../supabase/client";
import { axios } from "../../config";

export type ProductProps = {
  _id: string;
  images: string[];
  title: string;
  currency: {
    value: string;
  };
  price: number;
};

const getProducts = async () => {
  try {
    const products = await axios.get("/product/card");
    return products;
  } catch (error) {
    throw new Error(error as string);
  }
};

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

const getProductDetail = async (id: string) => {
  try {
    const product = await axios.get(`product/single?_id=${id}`);
    return product;
  } catch (error) {
    throw new Error(error as string);
  }
};

const getProductSearch = async (value: string) => {
  try {
    const product = await axios.get(`product/search?value=${value}`);
    return product;
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
  return { queryProduct };
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
