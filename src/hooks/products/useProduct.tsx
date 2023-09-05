import { useQuery } from "@tanstack/react-query";
import { client } from "../../../supabase/client";

const getProducts = async () => {
  try {
    const { data } = await client
      .from("Product")
      .select("id, images, title, price, currency")
      .is("typeAd", "null");
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const useProducts = () => {
  const queryProduct = useQuery(["products"], getProducts);
  return { queryProduct };
};
