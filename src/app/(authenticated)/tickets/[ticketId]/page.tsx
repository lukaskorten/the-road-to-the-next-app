import { notFound } from 'next/navigation';
import { SearchParams } from 'nuqs';
import { ticketsPath } from '@/app/paths';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Comments } from '@/features/comments/components/comments';
import { getComments } from '@/features/comments/queries/get-comments';
import { TicketItem } from '@/features/ticket/components/ticket-item';
import { getTicket } from '@/features/ticket/queries/get-ticket';
import { searchParamsCache } from '@/features/ticket/search-params';

type TicketPageProps = {
  params: Promise<{ ticketId: string }>;
  searchParams: Promise<SearchParams>;
};

export default async function TicketPage({
  params,
  searchParams,
}: TicketPageProps) {
  await searchParamsCache.parse(searchParams);
  const { ticketId } = await params;
  const [ticket, comments] = await Promise.all([
    getTicket(ticketId),
    getComments(ticketId),
  ]);

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
        <div className="max-w-145 w-full">
          <TicketItem ticket={ticket} isDetail />
          <Comments ticketId={ticket.id} comments={comments} />
        </div>
      </div>
    </>
  );
}
