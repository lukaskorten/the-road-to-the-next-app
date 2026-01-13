import { prisma } from '@/lib/prisma';
import { TicketsSearchParams } from '../search-params';

export async function getTickets(
  userId: string | undefined,
  searchParams: TicketsSearchParams
) {
  return await prisma.ticket.findMany({
    where: {
      userId,
      title: {
        contains: searchParams.search,
        mode: 'insensitive',
      },
    },
    orderBy: {
      ...(searchParams.sort === 'newest' && { createdAt: 'desc' }),
      ...(searchParams.sort === 'bounty' && { bounty: 'desc' }),
    },
    include: {
      user: {
        select: { username: true },
      },
    },
  });
}
