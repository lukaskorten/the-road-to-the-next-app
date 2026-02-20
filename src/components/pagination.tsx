'use client';

import { PaginationMetadata } from '@/types/pagination';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export type PageAndSize = {
  size: number;
  page: number;
};

type PaginationProps = {
  pagination: PageAndSize;
  metadata: PaginationMetadata;
  onPagination: (pagination: PageAndSize) => void;
};

export function Pagination({
  pagination,
  metadata,
  onPagination,
}: PaginationProps) {
  const pageStartOffset = pagination.page * pagination.size + 1;
  const pageEndOffset = pageStartOffset + pagination.size - 1;
  const actualPageEndOffset =
    pageEndOffset > metadata.count ? metadata.count : pageEndOffset;
  const label = `${pageStartOffset} to ${actualPageEndOffset} of ${metadata.count} `;

  const handlePrevious = () => {
    if (pagination.page === 0) return;
    onPagination({ ...pagination, page: pagination.page - 1 });
  };

  const handleNext = () => {
    onPagination({ ...pagination, page: pagination.page + 1 });
  };

  const handleSize = (value: string) => {
    const size = parseInt(value, 10);
    onPagination({ size, page: 0 });
  };

  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-muted-foreground">{label}</span>

      <div className="flex space-x-2">
        <Select
          onValueChange={handleSize}
          defaultValue={pagination.size.toString()}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
        <Button
          disabled={pagination.page < 1}
          onClick={handlePrevious}
          variant="outline"
        >
          Previous
        </Button>
        <Button
          disabled={!metadata.hasNextPage}
          onClick={handleNext}
          variant="outline"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
