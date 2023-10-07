import { axios } from "../config";

export const getGenders = async () => {
  const response = await axios({
    method: "GET",
    url: `/gender`,
  });
  return response.data;
};
