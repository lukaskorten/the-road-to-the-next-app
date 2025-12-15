import { initialTickets } from '@/data';
import { Ticket } from '../types';

export async function getTicket(ticketId: string): Promise<Ticket | null> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const ticket = initialTickets.find((t) => t.id === ticketId) || null;
  return new Promise((resolve) => resolve(ticket));
}
