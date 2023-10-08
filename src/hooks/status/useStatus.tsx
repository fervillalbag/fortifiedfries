import { useQuery } from "@tanstack/react-query";
import { getStatusProducts } from "../../services/status";

export const useStatusProducts = () => {
  const queryStatusProduct = useQuery(
    ["productsPromotions"],
    getStatusProducts
  );
  return queryStatusProduct;
};
