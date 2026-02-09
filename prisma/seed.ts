import { formatISO } from 'date-fns';
import { hashPassword } from '@/features/password/utils/hash-and-verify';
import { prisma } from '@/lib/prisma';

const users = [
  {
    username: 'admin',
    email: 'admin@admin.com',
  },
  {
    username: 'lukas',
    email: 'mail@lukas-korten.de',
  },
];

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

const comments = [
  { content: 'Started working on this ticket.' },
  { content: 'Initial implementation complete, ready for review.' },
  { content: 'Fixed the bug mentioned in the requirements.' },
  { content: 'All tests are passing locally.' },
  { content: 'Needs feedback on the approach before proceeding.' },
  { content: 'Refactored the code for better maintainability.' },
  { content: 'Performance benchmarks show a 40% improvement.' },
  { content: 'Documentation updated with examples.' },
  { content: 'Ready for deployment to staging environment.' },
  { content: 'Merged to main branch successfully.' },
  { content: 'User acceptance testing approved.' },
  { content: 'Deployed to production.' },
  { content: 'Monitoring shows no issues in production.' },
  { content: 'Closed as completed.' },
  { content: 'Available for the next sprint.' },
];

async function seed() {
  const t0 = performance.now();
  console.log('DB Seed: Started ...');

  await prisma.user.deleteMany();
  await prisma.ticket.deleteMany();

  const passwordHash = await hashPassword('geheimnis');
  const dbUsers = await prisma.user.createManyAndReturn({
    data: users.map((user) => ({ ...user, passwordHash })),
  });
  const dbTickets = await prisma.ticket.createManyAndReturn({
    data: tickets.map((ticket) => ({ ...ticket, userId: dbUsers[0].id })),
  });
  await prisma.comment.createMany({
    data: comments.map((comment) => ({
      ...comment,
      userId: dbUsers[1].id,
      ticketId: dbTickets[0].id,
    })),
  });
  const t1 = performance.now();
  console.log(`DB Seed: Finished in ${(t1 - t0).toFixed(2)} ms`);
}

seed();
