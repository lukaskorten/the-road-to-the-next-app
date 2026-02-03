import { prisma } from '@/lib/prisma';

export async function getComments(ticketId: string) {
  return prisma.comment.findMany({
    where: { ticketId },
    include: { user: { select: { username: true } } },
    orderBy: { createdAt: 'asc' },
  });
}
