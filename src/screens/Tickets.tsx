import BackBtn from "../components/BackBtn";
import { TicketCard } from "../components/Ticket";
import { useLocalStorageState } from "../hooks";
import { useTicketByUser } from "../hooks/ticket";
import { SURA_CREDENTIALS } from "../utils/constants";

export default function Tickets() {
  const [user] = useLocalStorageState({
    key: SURA_CREDENTIALS,
  });

  const queryTickets = useTicketByUser(user.id);

  return (
    <div>
      <BackBtn title="Tickets" />

      <div className="px-5 flex flex-col gap-y-4">
        {queryTickets.isLoading ? (
          <div>cargando..</div>
        ) : queryTickets.error ? (
          <div>error</div>
        ) : (
          queryTickets.data?.data.map((ticket: any) => (
            <TicketCard key={ticket._id} ticket={ticket} />
          ))
        )}
      </div>
    </div>
  );
}
