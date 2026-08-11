'use server';

import { revalidatePath } from 'next/cache';
import { organizationsPath } from '@/app/paths';
import {
  fromErrorToActionState,
  toErrorActionState,
  toSuccessActionState,
} from '@/components/form/utils/to-action-state';
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';
import { prisma } from '@/lib/prisma';
import { getOrganizationsByUser } from '../queries/get-organizations-by-user';

export async function switchOrganization(organizationId: string) {
  const { user } = await getAuthOrRedirect();

  try {
    const organizations = await getOrganizationsByUser();
    const canSwitch = organizations.some((o) => o.id === organizationId);
    if (!canSwitch) {
      return toErrorActionState('Not a member of this organization');
    }

    await prisma.membership.updateMany({
      where: {
        userId: user.id,
        organizationId: { not: organizationId },
      },
      data: {
        isActive: false,
      },
    });

    await prisma.membership.update({
      where: {
        userId_organizationId: {
          organizationId,
          userId: user.id,
        },
      },
      data: {
        isActive: true,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(organizationsPath());
  return toSuccessActionState('Organization switched!');
}
