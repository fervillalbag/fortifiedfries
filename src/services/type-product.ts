import { axios } from "../config";

export const getTypeProduct = async (name: string) => {
  const response = await axios({
    method: "GET",
    url: `/type-product/name/${name}`,
  });
  return response.data;
};
