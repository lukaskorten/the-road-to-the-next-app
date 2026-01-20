import { notFound } from 'next/navigation';
import { ticketsPath } from '@/app/paths';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { CommentForm } from '@/features/comments/components/comment-form';
import { CommentList } from '@/features/comments/components/comment-list';
import { TicketItem } from '@/features/ticket/components/ticket-item';
import { getTicket } from '@/features/ticket/queries/get-ticket';

type TicketPageProps = {
  params: Promise<{ ticketId: string }>;
};

export default async function TicketPage({ params }: TicketPageProps) {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);

  if (!ticket) {
    notFound();
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { title: 'Tickets', href: ticketsPath() },
          { title: ticket.title },
        ]}
      />
      <div className="flex justify-center animate-fade-from-top">
        <div className="flex flex-col space-y-8 max-w-145 w-full">
          <TicketItem ticket={ticket} isDetail />
          <CommentForm ticketId={ticket.id} />
          <CommentList ticketId={ticket.id} />
        </div>
      </div>
    </>
  );
}
