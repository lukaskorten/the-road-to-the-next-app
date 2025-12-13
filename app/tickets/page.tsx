import clsx from 'clsx';
import Link from 'next/link';
import { initialTickets } from '@/app/data';
import { ticketPath } from '@/app/paths';

const TICKET_ICONS = {
  OPEN: 'O',
  DONE: 'X',
  IN_PROGRESS: '>',
};

const TicketsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">TicketsPage</h2>
        <p className="text-sm ">All your tickets at one place</p>
      </div>

      <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
        {initialTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="w-full max-w-105 p-4 border border-slate-100 rounded"
          >
            <div>{TICKET_ICONS[ticket.status]}</div>
            <h2 className="text-lg font-semibold truncate">{ticket.title}</h2>
            <p
              className={clsx('text-sm text-slate-500 truncate', {
                'line-through': ticket.status === 'DONE',
              })}
            >
              {ticket.content}
            </p>
            <Link href={ticketPath(ticket.id)} className="underline text-sm">
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketsPage;
