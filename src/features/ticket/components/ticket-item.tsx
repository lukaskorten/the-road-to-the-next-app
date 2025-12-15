import Link from 'next/link';
import { ticketPath } from '@/app/paths';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TICKET_ICONS } from '../constants';
import { Ticket } from '../types';

type TicketItemProps = {
  ticket: Ticket;
};

function TicketItem({ ticket }: TicketItemProps) {
  return (
    <Card className="w-full max-w-105">
      <CardHeader>
        <CardTitle className="flex gap-x-2 items-center">
          <span>{TICKET_ICONS[ticket.status]}</span>
          <span className="truncate">{ticket.title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 whitespace-break-spaces">{ticket.content}</p>
      </CardContent>
      <CardFooter>
        <Link href={ticketPath(ticket.id)} className="underline text-sm">
          View
        </Link>
      </CardFooter>
    </Card>
  );
}

export { TicketItem };
