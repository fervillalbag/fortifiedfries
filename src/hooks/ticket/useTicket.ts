import { useQuery } from "@tanstack/react-query";
import { getTicketByUser } from "../../services/ticket";

export const useTicketByUser = (userId: string) => {
  const queryTicketByUser = useQuery(["ticket-by-user", userId], () =>
    getTicketByUser(userId)
  );
  return queryTicketByUser;
};
