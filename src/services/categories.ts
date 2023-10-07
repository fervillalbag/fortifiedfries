import { axios } from "../config";

export const getCategories = async () => {
  const response = await axios({
    method: "GET",
    url: "/category",
  });
  return response.data;
};

export const getSubCategories = async (id: string) => {
  const response = await axios({
    method: "GET",
    url: `/sub-category/category/${id}`,
  });
  return response.data;
};
