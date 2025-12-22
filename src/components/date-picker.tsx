'use client';

import { formatISO } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type DatePickerProps = {
  id: string;
  name: string;
  defaultValue?: string;
};

export function DatePicker({ id, name, defaultValue }: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : new Date()
  );

  const formattedDate = date ? formatISO(date, { representation: 'date' }) : '';
  return (
    <Popover>
      <PopoverTrigger id={id} asChild className="w-full">
        <Button
          variant="outline"
          data-empty={!date}
          className="justify-start font-normal"
        >
          <CalendarIcon />
          {formattedDate}
          <input type="hidden" name={name} value={formattedDate} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  );
}
