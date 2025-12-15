import Link from 'next/link';
import { ticketsPath } from '@/app/paths';
import { Placeholder } from '@/components/placeholder';
import { buttonVariants } from '@/components/ui/button';

export default function NotFound() {
  return (
    <Placeholder
      label="Ticket not found"
      button={
        <Link
          href={ticketsPath()}
          className={buttonVariants({ variant: 'outline' })}
        >
          Go to Tickets
        </Link>
      }
    />
  );
}
