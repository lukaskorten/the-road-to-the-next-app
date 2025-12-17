import { LucideLoader } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';

type SubmitButtonProps = {
  label: string;
};

export function SubmitButton({ label }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit">
      {pending && <LucideLoader className="w-4 h-4 animate-spin" />}
      {label}
    </Button>
  );
}
