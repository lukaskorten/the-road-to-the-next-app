'use server';

import { redirect } from 'next/navigation';
import { ticketsPath } from '@/app/paths';
import { prisma } from '@/lib/prisma';

export async function deleteTicket(ticketId: string) {
  await prisma.ticket.delete({
    where: { id: ticketId },
  });

  redirect(ticketsPath());
}
