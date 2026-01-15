'use client';

import { ChangeEvent } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from './ui/input';

type SearchInputProps = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

export function SearchInput({
  placeholder,
  value,
  onChange,
}: SearchInputProps) {
  const handleOnChange = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    250
  );

  return (
    <Input
      defaultValue={value}
      placeholder={placeholder}
      onChange={handleOnChange}
    />
  );
}
