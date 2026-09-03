'use client';

import { formatISO } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { RefObject, useImperativeHandle, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export type ImerativeHandleFromDatePicker = {
  reset: () => void;
};

type DatePickerProps = {
  id: string;
  name: string;
  defaultValue?: string;
  imperativeHandle?: RefObject<ImerativeHandleFromDatePicker | null>;
};

export function DatePicker({
  id,
  name,
  defaultValue,
  imperativeHandle,
}: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : new Date()
  );
  const [open, setOpen] = useState(false);
  useImperativeHandle(imperativeHandle, () => ({
    reset: () => setDate(new Date()),
  }));

  const handleSelect = (date: Date | undefined) => {
    setDate(date);
    setOpen(false);
  };

  const formattedDate = date ? formatISO(date, { representation: 'date' }) : '';
  return (
    <Popover open={open} onOpenChange={setOpen}>
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
        <Calendar mode="single" selected={date} onSelect={handleSelect} />
      </PopoverContent>
    </Popover>
  );
}
