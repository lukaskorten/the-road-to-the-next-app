'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { setCookie } from '@/actions/cookies';
import { ticketsPath } from '@/app/paths';
import {
  fromErrorToActionState,
  toErrorActionState,
} from '@/components/form/utils/to-action-state';
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';
import { isOwner } from '@/features/auth/utils/is-owner';
import { prisma } from '@/lib/prisma';

export async function deleteTicket(id: string) {
  const { user } = await getAuthOrRedirect();

  try {
    const ticket = await prisma.ticket.findUnique({ where: { id } });
    if (!ticket || !isOwner(user, ticket)) {
      return toErrorActionState('Not authorized');
    }

    await prisma.ticket.delete({
      where: { id },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(ticketsPath());
  await setCookie('toast', 'Ticket deleted');
  redirect(ticketsPath());
}
