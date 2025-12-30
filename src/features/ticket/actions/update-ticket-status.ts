'use server';

import { revalidatePath } from 'next/cache';
import { ticketsPath } from '@/app/paths';
import {
  fromErrorToActionState,
  toErrorActionState,
  toSuccessActionState,
} from '@/components/form/utils/to-action-state';
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';
import { isOwner } from '@/features/auth/utils/is-owner';
import { TicketStatus } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';

export async function updateTicketStatus(
  ticketId: string,
  newStatus: TicketStatus
) {
  const { user } = await getAuthOrRedirect();

  try {
    const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });
    if (!ticket || !isOwner(user, ticket)) {
      return toErrorActionState('Not authorized');
    }

    await prisma.ticket.update({
      where: { id: ticketId },
      data: { status: newStatus },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(ticketsPath());

  return toSuccessActionState('Status updated');
}
