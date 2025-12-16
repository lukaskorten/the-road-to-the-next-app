'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ticketsPath } from '@/app/paths';
import { prisma } from '@/lib/prisma';

export async function deleteTicket(ticketId: string) {
  await prisma.ticket.delete({
    where: { id: ticketId },
  });

  revalidatePath(ticketsPath());
  redirect(ticketsPath());
}
