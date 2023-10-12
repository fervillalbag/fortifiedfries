import { axios } from "../config";

export const getCurrencies = async () => {
  const response = await axios({
    method: "GET",
    url: `/currency`,
  });
  return response.data;
};

export const getCurrency = async (name: string) => {
  const response = await axios({
    method: "GET",
    url: `/currency/name/${name}`,
  });
  return response.data;
};
