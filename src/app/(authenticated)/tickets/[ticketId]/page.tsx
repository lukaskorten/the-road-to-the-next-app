import { notFound } from 'next/navigation';
import { SearchParams } from 'nuqs';
import { Suspense } from 'react';
import { ticketsPath } from '@/app/paths';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { CardCompact } from '@/components/card-compact';
import { Skeleton } from '@/components/ui/skeleton';
import { CommentForm } from '@/features/comments/components/comment-form';
import { CommentList } from '@/features/comments/components/comment-list';
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
        <div className="max-w-145 w-full">
          <TicketItem ticket={ticket} isDetail />

          <section className="mt-16 flex flex-col space-y-4">
            <CardCompact
              title="Comments"
              description="Share your thoughts and feedback on this ticket."
              content={<CommentForm ticketId={ticket.id} />}
            />

            <Suspense
              fallback={
                <div className="flex flex-col space-y-2">
                  <Skeleton className="h-21.25" />
                  <Skeleton className="h-21.25" />
                </div>
              }
            >
              <CommentList ticketId={ticket.id} />
            </Suspense>
          </section>
        </div>
      </div>
    </>
  );
}
