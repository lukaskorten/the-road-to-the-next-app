'use server';

import { getAuth } from '@/features/auth/queries/get-auth';
import { isOwner } from '@/features/auth/utils/is-owner';
import { prisma } from '@/lib/prisma';

export async function getComments(ticketId: string, offset: number = 0) {
  const { user } = await getAuth();
  const where = { ticketId };
  const skip = offset;
  const take = 5;

  const [comments, count] = await prisma.$transaction([
    prisma.comment.findMany({
      where,
      skip,
      take,
      include: { user: { select: { username: true } } },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.comment.count({ where }),
  ]);

  return {
    list: comments.map((comment) => ({
      ...comment,
      isOwner: isOwner(user, comment),
    })),
    metadata: {
      count,
      hasNextPage: skip + comments.length < count,
    },
  };
}
