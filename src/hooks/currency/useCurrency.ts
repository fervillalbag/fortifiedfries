import { useQuery } from "@tanstack/react-query";
import { getCurrencies, getCurrency } from "../../services";

export const useCurrency = (name: string) => {
  const queryCurrency = useQuery(["currency"], () =>
    getCurrency(name)
  );
  return queryCurrency;
};

export const useCurrencies = () => {
  const queryCurrency = useQuery(["currency"], getCurrencies);
  return queryCurrency;
};
