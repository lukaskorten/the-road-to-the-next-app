import clsx from 'clsx';
import {
  LucideMoreVertical,
  LucidePen,
  LucideSquareArrowOutUpRight,
} from 'lucide-react';
import Link from 'next/link';
import { ticketEditPath, ticketPath } from '@/app/paths';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Ticket } from '@/generated/prisma/client';
import { toCurrencyFromCent } from '@/utils/currency';
import { TICKET_STATUS_ICONS } from '../constants';
import { TicketMoreButton } from './ticket-more-button';

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

  const moreButton = (
    <TicketMoreButton
      ticket={ticket}
      trigger={
        <Button variant="outline" size="icon">
          <LucideMoreVertical />
        </Button>
      }
    />
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
            <span>{TICKET_STATUS_ICONS[ticket.status]}</span>
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
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">{ticket.deadline}</p>
          <p className="text-sm text-muted-foreground">
            {toCurrencyFromCent(ticket.bounty)}
          </p>
        </CardFooter>
      </Card>
      <div className="flex flex-col gap-y-1">
        {isDetail ? (
          <>
            {editButton}
            {moreButton}
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
