'use server';

import { prisma } from '@/lib/prisma';

export async function deleteTicket(ticketId: string) {
  await prisma.ticket.delete({
    where: { id: ticketId },
  });
}
