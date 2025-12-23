import { formatISO } from 'date-fns';
import { prisma } from '@/lib/prisma';

const deadline = formatISO(new Date(), { representation: 'date' });
const tickets = [
  {
    title: 'Ticket 1',
    content: 'This is the first ticket from the database',
    status: 'DONE' as const,
    bounty: 499,
    deadline,
  },
  {
    title: 'Ticket 2',
    content: 'This is the second ticket from the database',
    status: 'OPEN' as const,
    deadline,
    bounty: 699,
  },
  {
    title: 'Ticket 3',
    content: 'This is the third ticket from the database',
    status: 'IN_PROGRESS' as const,
    deadline,
    bounty: 899,
  },
];

async function seed() {
  const t0 = performance.now();
  console.log('DB Seed: Started ...');
  await prisma.ticket.deleteMany();

  await prisma.ticket.createMany({
    data: tickets,
  });
  const t1 = performance.now();
  console.log(`DB Seed: Finished in ${(t1 - t0).toFixed(2)} ms`);
}

seed();
