import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';
import { prisma } from '@/lib/prisma';

export async function getOrganizations() {
  const { user } = await getAuthOrRedirect();

  return prisma.organization.findMany({
    where: {
      memberships: {
        every: { userId: user.id },
      },
    },
  });
}
