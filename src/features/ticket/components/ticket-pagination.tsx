'use client';

import { useQueryState, useQueryStates } from 'nuqs';
import { useEffect, useRef } from 'react';
import { Pagination } from '@/components/pagination';
import { PaginationMetadata } from '@/utils/page-result';
import {
  paginationOptions,
  paginationParser,
  searchParser,
} from '../search-params';

type TicketPaginationProps = {
  metadata: PaginationMetadata;
};

export function TicketPagination({ metadata }: TicketPaginationProps) {
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions,
  );

  const [search] = useQueryState('search', searchParser);
  const prevSearchRef = useRef(search);

  useEffect(() => {
    if (search === prevSearchRef.current) return;
    prevSearchRef.current = search;

    setPagination({ ...pagination, page: 0 });
  }, [search, pagination, setPagination]);

  return (
    <Pagination
      pagination={pagination}
      onPagination={setPagination}
      metadata={metadata}
    />
  );
}
