'use server';

import { prisma } from '@/lib/prisma';

export async function getMemberships(organizationId: string) {
  return prisma.membership.findMany({
    where: {
      organizationId,
    },
    include: {
      user: true,
    },
  });
}
