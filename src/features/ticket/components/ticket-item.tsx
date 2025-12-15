import { LucideSquareArrowOutUpRight } from 'lucide-react';
import Link from 'next/link';
import { ticketPath } from '@/app/paths';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TICKET_ICONS } from '../constants';
import { Ticket } from '../types';

type TicketItemProps = {
  ticket: Ticket;
};

function TicketItem({ ticket }: TicketItemProps) {
  const detailsButton = (
    <Link
      href={ticketPath(ticket.id)}
      className={buttonVariants({ variant: 'outline', size: 'icon' })}
    >
      <LucideSquareArrowOutUpRight />
    </Link>
  );

  return (
    <div className="flex w-full max-w-105 gap-x-1">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex gap-x-2 items-center">
            <span>{TICKET_ICONS[ticket.status]}</span>
            <span className="truncate">{ticket.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-3 whitespace-break-spaces">
            {ticket.content}
          </p>
        </CardContent>
      </Card>
      <div className="flex flex-col gap-y-1">{detailsButton}</div>
    </div>
  );
}

export { TicketItem };
