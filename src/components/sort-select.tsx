'use client';

import { Route } from 'next';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
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
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSort = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === defaultValue) {
      params.delete('sort');
    } else if (value) {
      params.set('sort', value);
    } else {
      params.delete('sort');
    }

    replace(`${pathname}?${params.toString()}` as Route, {
      scroll: false,
    });
  }, 250);

  return (
    <Select
      onValueChange={handleSort}
      value={searchParams.get('sort') ?? defaultValue}
    >
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
