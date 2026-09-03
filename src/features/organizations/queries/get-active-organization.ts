'use server';

import { getAuth } from '@/features/auth/queries/get-auth';
import { prisma } from '@/lib/prisma';

export async function getActiveOrganization() {
  const { user } = await getAuth();
  if (!user) return;

  return prisma.organization.findFirst({
    where: {
      memberships: {
        some: {
          userId: user.id,
          isActive: true,
        },
      },
    },
  });
}
