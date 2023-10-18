import { axios } from "../config";

export const createTicket = async (data: any) => {
  const response = await axios({
    method: "POST",
    url: "/ticket",
    data: JSON.stringify(data),
  });
  return response;
};

export const getTicketByUser = async (userId: string) => {
  const response = await axios({
    method: "GET",
    url: `/ticket/user/${userId}`,
  });
  return response;
};
