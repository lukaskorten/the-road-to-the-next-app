'use client';

import { useQueryStates } from 'nuqs';
import { Pagination } from '@/components/pagination';
import { PaginationMetadata } from '@/utils/page-result';
import { paginationOptions, paginationParser } from '../search-params';

type TicketPaginationProps = {
  metadata: PaginationMetadata;
};

export function TicketPagination({ metadata }: TicketPaginationProps) {
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions,
  );

  return (
    <Pagination
      pagination={pagination}
      onPagination={setPagination}
      metadata={metadata}
    />
  );
}
