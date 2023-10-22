import { useQuery } from "@tanstack/react-query";
import { getContactsMessages } from "../../services/message";

export const useContactsMessages = (userId: string) => {
  const queryContacts = useQuery(["contacts-messages", userId], () =>
    getContactsMessages(userId)
  );
  return queryContacts;
};
