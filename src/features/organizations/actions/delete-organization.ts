'use server';

import {
  fromErrorToActionState,
  toErrorActionState,
  toSuccessActionState,
} from '@/components/form/utils/to-action-state';
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';
import { prisma } from '@/lib/prisma';

export async function deleteOrganization(organizationId: string) {
  const { user } = await getAuthOrRedirect();

  try {
    const activeMembership = await prisma.membership.findFirst({
      where: {
        organizationId,
        userId: user.id,
        isActive: true,
      },
    });

    if (activeMembership) {
      return toErrorActionState(
        'You cannot delete the organization you are currently active in.'
      );
    }

    const membershipsCount = await prisma.membership.count({
      where: { organizationId, userId: { not: user.id } },
    });

    if (membershipsCount > 0) {
      return toErrorActionState(
        'There are other users within the organization.'
      );
    }

    await prisma.organization.delete({ where: { id: organizationId } });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  return toSuccessActionState('Organization successfully deleted.');
}
