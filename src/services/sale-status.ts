import { axios } from "../config";

export const getSalesStatus = async () => {
  const response = await axios({
    method: "GET",
    url: "/sale-status",
  });
  return response.data;
};

export const getSaleStatus = async (name: string) => {
  const response = await axios({
    method: "GET",
    url: `/sale-status/name/${name}`,
  });
  return response.data;
};
