import { axios } from "../config";

export const getContactsMessages = async (userId: string) => {
  const response = await axios({
    method: "GET",
    url: `/message/user/${userId}/contacts`,
  });
  return response;
};

export const createMessage = async (data: any) => {
  const response = await axios({
    method: "POST",
    url: "/message",
    data: JSON.stringify(data),
  });
  return response;
};

export const getAllMessages = async (
  sender: string,
  receiver: string
) => {
  const response = await axios({
    method: "GET",
    url: `/message?receiver=${receiver}&sender=${sender}`,
  });
  return response;
};

export const markMessagesAsSeen = async (
  sender: string,
  receiver: string
) => {
  const response = await axios({
    method: "GET",
    url: `/message/mark-messages-as-seen?receiver=${receiver}&sender=${sender}`,
  });
  return response;
};
