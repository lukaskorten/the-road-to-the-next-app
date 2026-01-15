'use client';

import { useQueryStates } from 'nuqs';
import { useDebouncedCallback } from 'use-debounce';
import { sortOptions, sortParser } from '@/features/ticket/search-params';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

type SelectOption = {
  label: string;
  sortKey: string;
  sortValue: string;
};

type SortSelectProps = {
  options: SelectOption[];
};

export function SortSelect({ options }: SortSelectProps) {
  const [sort, setSort] = useQueryStates(sortParser, sortOptions);

  const handleSort = useDebouncedCallback((value: string) => {
    const [sortKey, sortValue] = value.split('_');
    setSort({ sortKey, sortValue });
  }, 250);

  return (
    <Select
      onValueChange={handleSort}
      defaultValue={sort.sortKey + '_' + sort.sortValue}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.sortKey + '_' + option.sortValue}
            value={option.sortKey + '_' + option.sortValue}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
