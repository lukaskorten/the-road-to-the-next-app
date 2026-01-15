'use client';

import { useQueryState } from 'nuqs';
import { SearchInput } from '@/components/search-input';
import { searchParser } from '../search-params';

export function TicketSearchInput() {
  const [search, setSearch] = useQueryState('search', searchParser);

  return (
    <SearchInput
      placeholder="Search tickets..."
      value={search}
      onChange={setSearch}
    />
  );
}
