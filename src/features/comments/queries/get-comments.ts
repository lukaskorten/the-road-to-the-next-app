'use server';

import { getAuth } from '@/features/auth/queries/get-auth';
import { isOwner } from '@/features/auth/utils/is-owner';
import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { CommentWithMetadata } from '../types';

export type CommentCursor = Pick<CommentWithMetadata, 'createdAt' | 'id'>;

export async function getComments(ticketId: string, cursor?: CommentCursor) {
  const { user } = await getAuth();
  const where = { ticketId };
  const skip = cursor ? 1 : 0;
  const take = 5;

  const [comments, count] = await prisma.$transaction([
    prisma.comment.findMany({
      where,
      skip,
      take: take + 1, // Load one more item to compute the hasNextPage boolean.
      cursor,
      include: { user: { select: { username: true } } },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    }),
    prisma.comment.count({ where }),
  ]);

  return {
    // remove the last item from the list
    list: comments.slice(0, -1).map((comment) => ({
      ...comment,
      isOwner: isOwner(user, comment),
    })),
    metadata: {
      count,
      // If there is one more item than the page size, it will have a next page.
      hasNextPage: comments.length > take,
      cursor: toCursor(comments.at(-2)),
    },
  };
}

function toCursor(
  comment?: Prisma.CommentGetPayload<undefined>,
): CommentCursor | undefined {
  return comment && { id: comment.id, createdAt: comment.createdAt };
}
