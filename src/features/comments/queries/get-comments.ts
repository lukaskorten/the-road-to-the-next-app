import { prisma } from '@/lib/prisma';

export async function getComments(ticketId: string) {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay
  return prisma.comment.findMany({
    where: { ticketId },
    include: { user: { select: { username: true } } },
    orderBy: { createdAt: 'asc' },
  });
}
