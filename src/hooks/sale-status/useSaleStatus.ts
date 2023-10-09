import { useQuery } from "@tanstack/react-query";
import { getSaleStatus } from "../../services/sale-status";

export const useSaleStatus = (name: string) => {
  const querySaleStatus = useQuery(["use-sale-status"], () =>
    getSaleStatus(name)
  );
  return querySaleStatus;
};
