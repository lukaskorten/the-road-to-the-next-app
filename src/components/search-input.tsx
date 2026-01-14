'use client';

import { useQueryState } from 'nuqs';
import { ChangeEvent } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { parsers } from '@/features/ticket/search-params';
import { Input } from './ui/input';

type SearchInputProps = {
  placeholder: string;
};

export function SearchInput({ placeholder }: SearchInputProps) {
  const [search, setSearch] = useQueryState('search', parsers.search);

  const handleOnChange = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    250
  );

  return (
    <Input
      defaultValue={search}
      placeholder={placeholder}
      onChange={handleOnChange}
    />
  );
}
