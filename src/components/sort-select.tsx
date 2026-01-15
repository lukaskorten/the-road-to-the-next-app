'use client';

import { useDebouncedCallback } from 'use-debounce';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export type SortSelectOption = {
  label: string;
  sortKey: string;
  sortValue: string;
};

export type SortParams = {
  sortKey: string;
  sortValue: string;
};

type SortSelectProps = {
  options: SortSelectOption[];
  onChange: (value: SortParams) => void;
  defaultValue?: string;
};

export function SortSelect({
  options,
  onChange,
  defaultValue,
}: SortSelectProps) {
  const handleSort = useDebouncedCallback((value: string) => {
    const [sortKey, sortValue] = value.split('_');
    onChange({ sortKey, sortValue });
  }, 250);

  return (
    <Select onValueChange={handleSort} defaultValue={defaultValue}>
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
