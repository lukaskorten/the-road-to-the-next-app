import clsx from 'clsx';
import {
  LucidePen,
  LucideSquareArrowOutUpRight,
  LucideTrash,
} from 'lucide-react';
import Link from 'next/link';
import { ticketEditPath, ticketPath } from '@/app/paths';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Ticket } from '@/generated/prisma/client';
import { deleteTicket } from '../actions/delete-ticket';
import { TICKET_ICONS } from '../constants';

type TicketItemProps = {
  ticket: Ticket;
  isDetail?: boolean;
};

function TicketItem({ ticket, isDetail = false }: TicketItemProps) {
  const detailButton = (
    <Link
      prefetch
      href={ticketPath(ticket.id)}
      className={buttonVariants({ variant: 'outline', size: 'icon' })}
    >
      <LucideSquareArrowOutUpRight />
    </Link>
  );

  const editButton = (
    <Link
      href={ticketEditPath(ticket.id)}
      className={buttonVariants({ variant: 'outline', size: 'icon' })}
    >
      <LucidePen />
    </Link>
  );

  const deleteButton = (
    <form action={deleteTicket.bind(null, ticket.id)}>
      <Button variant="outline" size="icon">
        <LucideTrash />
      </Button>
    </form>
  );

  return (
    <div
      className={clsx('flex w-full gap-x-1', {
        'max-w-105': !isDetail,
        'max-w-145': isDetail,
      })}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex gap-x-2 items-center">
            <span>{TICKET_ICONS[ticket.status]}</span>
            <span className="truncate">{ticket.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p
            className={clsx('whitespace-break-spaces', {
              'line-clamp-3': !isDetail,
            })}
          >
            {ticket.content}
          </p>
        </CardContent>
      </Card>
      <div className="flex flex-col gap-y-1">
        {isDetail ? (
          <>
            {editButton}
            {deleteButton}
          </>
        ) : (
          <>
            {detailButton}
            {editButton}
          </>
        )}
      </div>
    </div>
  );
}

export { TicketItem };
