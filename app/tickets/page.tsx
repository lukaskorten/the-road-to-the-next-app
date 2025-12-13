import Link from 'next/link';
import { initialTickets } from '@/app/data';
import { ticketPath } from '@/app/paths';

const TicketsPage = () => {
  return (
    <div>
      <h2 className="text-lg">Tickets Page</h2>

      {initialTickets.map((ticket) => (
        <div key={ticket.id}>
          <h3 className="text-lg">{ticket.title}</h3>
          <Link href={ticketPath(ticket.id)} className="underline text-sm">
            View
          </Link>
        </div>
      ))}
    </div>
  );
};

export default TicketsPage;
