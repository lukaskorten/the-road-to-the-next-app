'use client';

import { LucideLoader } from 'lucide-react';
import { ReactElement } from 'react';
import { useFormStatus } from 'react-dom';
import { Button, ButtonSize, ButtonVariant } from '../ui/button';

type IconPosition = 'left' | 'right';

type SubmitButtonProps = {
  label?: string;
  icon?: ReactElement<HTMLElement>;
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconPosition?: IconPosition;
};

export function SubmitButton({
  label,
  icon,
  variant,
  size,
  iconPosition = 'left',
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant={variant} size={size}>
      {pending && <LucideLoader className="animate-spin" />}
      {iconPosition === 'right' ? (
        <>
          {label}
          {pending ? null : icon}
        </>
      ) : (
        <>
          {pending ? null : icon}
          {label}
        </>
      )}
    </Button>
  );
}
