import { useQuery } from "@tanstack/react-query";
import { getCurrency } from "../../services";

export const useCurrency = (name: string) => {
  const queryCurrency = useQuery(["currency"], () =>
    getCurrency(name)
  );
  return queryCurrency;
};
