'use server';

import {
  fromErrorToActionState,
  toErrorActionState,
  toSuccessActionState,
} from '@/components/form/utils/to-action-state';
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';
import { prisma } from '@/lib/prisma';
import { getMemberships } from '../queries/get-memberships';

export async function deleteMembership(userId: string, organizationId: string) {
  const { user } = await getAuthOrRedirect();
  const isLoggedInUser = userId === user.id;

  try {
    const { memberships } = await getMemberships(organizationId);
    const isLastMembership = memberships.length === 1;

    if (isLastMembership) {
      return toErrorActionState(
        isLoggedInUser
          ? "You can't leave the organization as the last member!"
          : "You can't delete the last membership of an organization!"
      );
    }

    await prisma.membership.delete({
      where: { membershipId: { userId, organizationId } },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  return toSuccessActionState(
    isLoggedInUser
      ? 'You have left the organization!'
      : 'The Membership has been deleted!'
  );
}
