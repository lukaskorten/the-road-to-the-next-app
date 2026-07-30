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
    },
  });

  console.log('membership', organizations[0]?.memberships[0]);
  console.log('joinedAt', organizations[0]?.memberships[0]?.joinedAt);

  return organizations.map(({ memberships, ...organization }) => ({
    ...organization,
    membershipByUser: memberships[0],
  }));
}
