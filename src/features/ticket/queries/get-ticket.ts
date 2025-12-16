import { prisma } from '@/lib/prisma';
import { Ticket } from '../types';

export async function getTicket(ticketId: string): Promise<Ticket | null> {
  return prisma.ticket.findUnique({ where: { id: ticketId } });
}
