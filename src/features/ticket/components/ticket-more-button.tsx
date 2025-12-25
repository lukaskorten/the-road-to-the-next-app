import { DropdownMenuRadioGroup } from '@radix-ui/react-dropdown-menu';
import { LucideTrash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Ticket } from '@/generated/prisma/client';
import { TICKET_STATUS_LABELS, TICKET_STATUSES } from '../constants';

type TicketMoreButtonProps = {
  ticket: Ticket;
  trigger: React.ReactNode;
};

export function TicketMoreButton({ ticket, trigger }: TicketMoreButtonProps) {
  const deleteButton = (
    <DropdownMenuItem>
      <LucideTrash />
      <span>Delete</span>
    </DropdownMenuItem>
  );

  const ticketStatusRadioGroupItems = (
    <DropdownMenuRadioGroup value={ticket.status}>
      {TICKET_STATUSES.map((status) => (
        <DropdownMenuRadioItem key={status} value={status}>
          {TICKET_STATUS_LABELS[status]}
        </DropdownMenuRadioItem>
      ))}
    </DropdownMenuRadioGroup>
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" side="right">
        {ticketStatusRadioGroupItems}
        <DropdownMenuSeparator />
        {deleteButton}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
