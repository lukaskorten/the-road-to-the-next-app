import { LucideCircleCheck, LucideFileText, LucidePen } from 'lucide-react';
import { TicketStatus } from '@/generated/prisma/enums';

export const TICKET_STATUS_ICONS = {
  OPEN: <LucideFileText />,
  DONE: <LucideCircleCheck />,
  IN_PROGRESS: <LucidePen />,
};

export const TICKET_STATUS_LABELS = {
  OPEN: 'Open',
  DONE: 'Done',
  IN_PROGRESS: 'In Progress',
};

export const TICKET_STATUSES = Object.keys(
  TICKET_STATUS_LABELS
) as Array<TicketStatus>;
