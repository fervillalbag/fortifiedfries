import { useQuery } from "@tanstack/react-query";
import { axios } from "../../config";

export type ProductPromotionsProps = {
  _id: string;
  images: string[];
  title: string;
  currency: {
    value: string;
  };
  price: number;
};

const getProductsPromotions = async (ad: string): Promise<any> => {
  try {
    const products = axios.get(`/product/ad/${ad}`);
    return products;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const useProductsPromotions = (ad: string) => {
  const queryProduct = useQuery(["productsPromotions", ad], () =>
    getProductsPromotions(ad)
  );
  return { queryProduct };
};
