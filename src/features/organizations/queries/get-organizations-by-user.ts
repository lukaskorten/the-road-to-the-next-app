import { getAuth } from '@/features/auth/queries/get-auth';
import { prisma } from '@/lib/prisma';

export async function getOrganizationsByUser() {
  const { user } = await getAuth();
  if (!user) {
    return [];
  }

  const organizations = await prisma.organization.findMany({
    where: {
      memberships: {
        some: { userId: user.id },
      },
    },
    include: {
      memberships: {
        where: {
          userId: user.id,
        },
      },
      _count: {
        select: {
          memberships: true,
        },
      },
    },
  });

  return organizations.map(({ memberships, _count, ...organization }) => ({
    ...organization,
    membershipByUser: memberships[0],
    membersCount: _count.memberships,
  }));
}
