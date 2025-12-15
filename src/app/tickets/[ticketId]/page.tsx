import Link from 'next/link';
import { ticketsPath } from '@/app/paths';
import { Placeholder } from '@/components/placeholder';
import { buttonVariants } from '@/components/ui/button';
import { initialTickets } from '@/data';

type TicketPageProps = {
  params: Promise<{ ticketId: string }>;
};

export default async function TicketPage({ params }: TicketPageProps) {
  const { ticketId } = await params;
  const ticket = initialTickets.find(({ id }) => id === ticketId);

  if (!ticket) {
    return (
      <Placeholder
        label="Ticket not found"
        button={
          <Link
            href={ticketsPath()}
            className={buttonVariants({ variant: 'outline' })}
          >
            Go to Tickets
          </Link>
        }
      />
    );
  }

  return (
    <div>
      <h2 className="text-lg">{ticket.title}</h2>
      <p className="text-sm">{ticket.content}</p>
    </div>
  );
}
