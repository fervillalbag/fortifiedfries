import { useQuery } from "@tanstack/react-query";
import {
  markMessagesAsSeen,
  getAllMessages,
  getContactsMessages,
} from "../../services/message";

export const useContactsMessages = (userId: string) => {
  const queryContacts = useQuery(["contacts-messages", userId], () =>
    getContactsMessages(userId)
  );
  return queryContacts;
};

export const useAllMessages = (sender: string, receiver: string) => {
  const queryContacts = useQuery(
    ["all-messages", sender, receiver],
    () => getAllMessages(sender, receiver)
  );
  return queryContacts;
};

export const useMarkMessagesAsSeen = (
  sender: string,
  receiver: string
) => {
  const queryMarkAsSeen = useQuery(
    ["mark-messages-as-seen", sender, receiver],
    () => markMessagesAsSeen(sender, receiver)
  );
  return queryMarkAsSeen;
};
