'use client';

import { Route } from 'next';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from './ui/input';

type SearchInputProps = {
  placeholder: string;
};

export function SearchInput({ placeholder }: SearchInputProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleOnChange = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      const params = new URLSearchParams(searchParams);

      if (value) {
        params.set('search', value);
      } else {
        params.delete('search');
      }

      replace(`${pathname}?${params.toString()}` as Route, {
        scroll: false,
      });
    },
    250
  );

  return <Input placeholder={placeholder} onChange={handleOnChange} />;
}
