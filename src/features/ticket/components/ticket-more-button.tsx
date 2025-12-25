import { LucideTrash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Ticket } from '@/generated/prisma/client';

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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" side="right">
        {deleteButton}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
