import { TicketWhereInput } from '@/generated/prisma/models';
import { prisma } from '@/lib/prisma';
import { TicketsSearchParams } from '../search-params';

export async function getTickets(
  userId: string | undefined,
  searchParams: TicketsSearchParams,
) {
  const take = searchParams.size;
  const skip = searchParams.page * searchParams.size;

  const where: TicketWhereInput = {
    userId,
    title: {
      contains: searchParams.search,
      mode: 'insensitive',
    },
  };

  const [tickets, count] = await prisma.$transaction([
    prisma.ticket.findMany({
      take,
      skip,
      where,
      orderBy: {
        [searchParams.sortKey]: searchParams.sortValue,
      },
      include: {
        user: {
          select: { username: true },
        },
      },
    }),
    prisma.ticket.count({ where }),
  ]);

  return {
    list: tickets,
    metadata: {
      hasNextPage: skip + tickets.length < count,
      count,
    },
  };
}
