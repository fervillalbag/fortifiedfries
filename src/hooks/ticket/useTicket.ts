import { useQuery } from "@tanstack/react-query";
import { getTicket, getTicketByUser } from "../../services";

export const useTicketByUser = (userId: string) => {
  const queryTicketByUser = useQuery(["ticket-by-user", userId], () =>
    getTicketByUser(userId)
  );
  return queryTicketByUser;
};

export const useGetTicket = (id: string) => {
  const queryTicket = useQuery(["ticket-by-user", id], () =>
    getTicket(id)
  );
  return queryTicket;
};
