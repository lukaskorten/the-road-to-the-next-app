'use server';

import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';
import { prisma } from '@/lib/prisma';

export async function getMemberships(organizationId: string) {
  await getAuthOrRedirect();
  return prisma.membership.findMany({
    where: {
      organizationId,
    },
    include: {
      user: {
        select: {
          username: true,
          email: true,
          emailVerified: true,
        },
      },
    },
  });
}
