'use server';

import { revalidatePath } from 'next/cache';
import { membershipsPath } from '@/app/paths';
import {
  fromErrorToActionState,
  toErrorActionState,
  toSuccessActionState,
} from '@/components/form/utils/to-action-state';
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';
import { prisma } from '@/lib/prisma';
import { getMemberships } from '../queries/get-memberships';

export async function deleteMembership(userId: string, organizationId: string) {
  await getAuthOrRedirect();

  try {
    const { memberships } = await getMemberships(organizationId);
    const isLastMembership = memberships.length === 1;

    if (isLastMembership) {
      return toErrorActionState(
        "You can't delete the last membership of an organization!"
      );
    }

    await prisma.membership.delete({
      where: { membershipId: { userId, organizationId } },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(membershipsPath(organizationId));
  return toSuccessActionState('The Membership has been deleted!');
}
