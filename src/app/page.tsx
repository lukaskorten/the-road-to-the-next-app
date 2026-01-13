import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';
import { Heading } from '@/components/heading';
import { Spinner } from '@/components/spinner';
import { TicketList } from '@/features/ticket/components/ticket-list';
import { searchParamsCache } from '@/features/ticket/search-params';

type HomePageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  await searchParamsCache.parse(searchParams);

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Home" description="Your home place to start" />

      <Suspense fallback={<Spinner />}>
        <TicketList />
      </Suspense>
    </div>
  );
}
