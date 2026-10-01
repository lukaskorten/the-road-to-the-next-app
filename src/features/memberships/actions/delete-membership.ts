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
  const isLeaving = userId === user.id;

  try {
    const { memberships } = await getMemberships(organizationId);
    const admins = memberships.filter((m) => m.role === 'ADMIN');
    const loggedInMembership = memberships.find((m) => m.userId === user.id);
    const isAdmin = loggedInMembership?.role === 'ADMIN';
    const isLastAdmin = admins.length === 1 && isAdmin;

    if (isLastAdmin && isLeaving) {
      return toErrorActionState(
        "You can't leave the organization as the last admin."
      );
    }

    if (!isLeaving && !isAdmin) {
      return toErrorActionState(
        'You must be an admin to delete this membership.'
      );
    }

    const isLastMembership = memberships.length === 1;

    if (isLastMembership) {
      return toErrorActionState(
        isLeaving
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
    isLeaving
      ? 'You have left the organization!'
      : 'The Membership has been deleted!'
  );
}
