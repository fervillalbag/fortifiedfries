import { axios } from "../config";

export const createTicket = async (data: any) => {
  const response = await axios({
    method: "POST",
    url: "/ticket",
    data: JSON.stringify(data),
  });
  return response;
};
