import { notFound } from 'next/navigation';
import { ticketPath, ticketsPath } from '@/app/paths';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { CardCompact } from '@/components/card-compact';
import { TicketUpsertForm } from '@/features/ticket/components/ticket-upsert-form';
import { getTicket } from '@/features/ticket/queries/get-ticket';

type TicketEditPageProps = {
  params: Promise<{ ticketId: string }>;
};

export default async function TicketEditPage({ params }: TicketEditPageProps) {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);

  const isTicketFound = !!ticket;

  if (!isTicketFound || !ticket.isOwner) {
    notFound();
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { title: 'Tickets', href: ticketsPath() },
          { title: ticket.title ?? '', href: ticketPath(ticketId) },
          { title: 'Edit' },
        ]}
      />
      <div className="flex-1 flex items-center justify-center">
        <CardCompact
          title="Edit ticket"
          description="Edit an existing ticket"
          content={<TicketUpsertForm ticket={ticket} />}
          className="w-full max-w-105"
        />
      </div>
    </>
  );
}
