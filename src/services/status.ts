import { axios } from "../config";

export const getStatusProducts = async () => {
  const response = await axios({
    method: "GET",
    url: "/status-product",
  });
  return response.data;
};
