'use client';

import { useQueryState } from 'nuqs';
import { useDebouncedCallback } from 'use-debounce';
import { parsers } from '@/features/ticket/search-params';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

type SelectOption = {
  value: string;
  label: string;
};

type SortSelectProps = {
  defaultValue: string;
  options: SelectOption[];
};

export function SortSelect({ defaultValue, options }: SortSelectProps) {
  const [sort, setSort] = useQueryState('sort', parsers.sort);

  const handleSort = useDebouncedCallback((value: string) => {
    setSort(value);
  }, 250);

  return (
    <Select onValueChange={handleSort} value={sort ?? defaultValue}>
      <SelectTrigger className="w-45">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
