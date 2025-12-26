'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { setCookie } from '@/actions/cookies';
import { ticketsPath } from '@/app/paths';
import { fromErrorToActionState } from '@/components/form/utils/to-action-state';
import { prisma } from '@/lib/prisma';

export async function deleteTicket(id: string) {
  try {
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
