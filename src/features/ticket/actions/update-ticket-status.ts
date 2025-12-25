'use server';

import { revalidatePath } from 'next/cache';
import { ticketPath, ticketsPath } from '@/app/paths';
import {
  fromErrorToActionState,
  toSuccessActionState,
} from '@/components/form/utils/to-action-state';
import { TicketStatus } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';

export async function updateTicketStatus(
  ticketId: string,
  newStatus: TicketStatus
) {
  try {
    await prisma.ticket.update({
      where: { id: ticketId },
      data: { status: newStatus },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(ticketPath(ticketId));
  revalidatePath(ticketsPath());

  return toSuccessActionState('Status updated');
}
