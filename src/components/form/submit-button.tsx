'use client';

import { LucideLoader } from 'lucide-react';
import { ReactElement } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';

type SubmitButtonProps = {
  label?: string;
  icon?: ReactElement<HTMLElement>;
};

export function SubmitButton({ label, icon }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit">
      {pending && <LucideLoader className="animate-spin" />}
      {label}
      {pending ? null : icon}
    </Button>
  );
}
