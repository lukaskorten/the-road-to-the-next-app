import { getAuth } from '@/features/auth/queries/get-auth';
import { isOwner } from '@/features/auth/utils/is-owner';
import { TicketWhereInput } from '@/generated/prisma/models';
import { prisma } from '@/lib/prisma';
import { TicketsSearchParams } from '../search-params';

export async function getTickets(
  userId: string | undefined,
  searchParams: TicketsSearchParams,
) {
  const { user } = await getAuth();
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
    list: tickets.map((ticket) => ({
      ...ticket,
      isOwner: isOwner(user, ticket),
    })),
    metadata: {
      hasNextPage: skip + tickets.length < count,
      count,
    },
  };
}
