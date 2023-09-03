import { useQuery } from "@tanstack/react-query";
import { client } from "../../../supabase/client";

const getProductsPromotions = async () => {
  try {
    const { data } = await client
      .from("Product")
      .select("id, images, title, price, currency")
      .eq("typeAd", 3);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const useProductsPromotions = () => {
  const queryProduct = useQuery(
    ["productsPromotions"],
    getProductsPromotions
  );
  return { queryProduct };
};
