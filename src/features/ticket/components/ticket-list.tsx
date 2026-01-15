import { Placeholder } from '@/components/placeholder';
import { SearchInput } from '@/components/search-input';
import { SortSelect } from '@/components/sort-select';
import { getTickets } from '../queries/get-tickets';
import { searchParamsCache } from '../search-params';
import { TicketItem } from './ticket-item';

type TicketListProps = {
  userId?: string;
};

export async function TicketList({ userId }: TicketListProps) {
  const searchParams = searchParamsCache.all();
  const tickets = await getTickets(userId, searchParams);

  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
      <div className="max-w-105 w-full flex gap-x-2">
        <SearchInput placeholder="Search ticket..." />
        <SortSelect
          options={[
            {
              sortKey: 'createdAt',
              sortValue: 'desc',
              label: 'Newest',
            },
            {
              sortKey: 'createdAt',
              sortValue: 'asc',
              label: 'Oldest',
            },
            {
              sortKey: 'bounty',
              sortValue: 'desc',
              label: 'Bounty',
            },
            {
              sortKey: 'bounty',
              sortValue: 'asc',
              label: 'Lowest Bounty',
            },
          ]}
        />
      </div>

      {tickets.length ? (
        tickets.map((ticket) => <TicketItem key={ticket.id} ticket={ticket} />)
      ) : (
        <Placeholder label="No tickets found." />
      )}
    </div>
  );
}
