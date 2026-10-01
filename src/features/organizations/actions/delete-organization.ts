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
    const membership = await prisma.membership.findFirst({
      where: {
        organizationId,
        userId: user.id,
      },
    });

    if (membership?.isActive) {
      return toErrorActionState(
        'You cannot delete the organization you are currently active in.'
      );
    }

    if (!membership || membership.role !== 'ADMIN') {
      return toErrorActionState(
        'You must be an admin to delete the organization.'
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
