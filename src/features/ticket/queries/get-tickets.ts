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
      [searchParams.sortKey]: searchParams.sortValue,
    },
    include: {
      user: {
        select: { username: true },
      },
    },
  });
}
