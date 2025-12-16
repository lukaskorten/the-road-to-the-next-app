import { prisma } from '@/lib/prisma';

const tickets = [
  {
    id: '1',
    title: 'Ticket 1',
    content: 'This is the first ticket from the database',
    status: 'DONE' as const,
  },
  {
    id: '2',
    title: 'Ticket 2',
    content: 'This is the second ticket from the database',
    status: 'OPEN' as const,
  },
  {
    id: '3',
    title: 'Ticket 3',
    content: 'This is the third ticket from the database',
    status: 'IN_PROGRESS' as const,
  },
];

async function seed() {
  await prisma.ticket.createMany({
    data: tickets,
  });
}

seed();
