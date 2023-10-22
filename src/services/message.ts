import { axios } from "../config";

export const getContactsMessages = async (userId: string) => {
  const response = await axios({
    method: "GET",
    url: `/message/user/${userId}/contacts`,
  });
  return response;
};
