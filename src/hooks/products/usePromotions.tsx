import { useQuery } from "@tanstack/react-query";
import { client } from "../../../supabase/client";

export type ProductPromotionsProps = {
  id: number;
  images: string[];
  title: string;
  currency: number;
  price: number;
};

const getProductsPromotions = async (): Promise<
  ProductPromotionsProps[] | null
> => {
  try {
    const { data } = await client
      .from("Product")
      .select("id, images, title, price, currency")
      .eq("typeAd", 3);
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const useProductsPromotions = () => {
  const queryProduct = useQuery(
    ["productsPromotions"],
    getProductsPromotions
  );
  return { queryProduct };
};
