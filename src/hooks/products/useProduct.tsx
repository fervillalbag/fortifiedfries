import { useQuery } from "@tanstack/react-query";
import { client } from "../../../supabase/client";

export type ProductProps = {
  id: number;
  images: string[];
  title: string;
  currency: number;
  price: number;
};

const getProducts = async (): Promise<ProductProps[] | null> => {
  try {
    const { data } = await client
      .from("Product")
      .select("id, images, title, price, currency")
      .is("typeAd", "null");
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const useProducts = () => {
  const queryProduct = useQuery(["products"], getProducts);
  return { queryProduct };
};
