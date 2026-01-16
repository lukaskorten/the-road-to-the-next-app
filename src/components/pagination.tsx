'use client';

import { Button } from './ui/button';

export type PageAndSize = {
  size: number;
  page: number;
};

type PaginationProps = {
  pagination: PageAndSize;
  onPagination: (pagination: PageAndSize) => void;
};

export function Pagination({ pagination, onPagination }: PaginationProps) {
  const pageStartOffset = pagination.page * pagination.size + 1;
  const pageEndOffset = pageStartOffset + pagination.size - 1;
  const label = `${pageStartOffset} to ${pageEndOffset} of X`;

  const handlePrevious = () => {
    if (pagination.page === 0) return;
    onPagination({ ...pagination, page: pagination.page - 1 });
  };

  const handleNext = () => {
    onPagination({ ...pagination, page: pagination.page + 1 });
  };

  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-muted-foreground">{label}</span>

      <div className="flex space-x-2">
        <Button
          disabled={pagination.page < 1}
          onClick={handlePrevious}
          variant="outline"
        >
          Previous
        </Button>
        <Button onClick={handleNext} variant="outline">
          Next
        </Button>
      </div>
    </div>
  );
}
