'use server';

import { revalidatePath } from 'next/cache';
import { membershipsPath } from '@/app/paths';
import {
  fromErrorToActionState,
  toErrorActionState,
  toSuccessActionState,
} from '@/components/form/utils/to-action-state';
import { getAdminOrRedirect } from '@/features/auth/queries/get-admin-or-redirect';
import { MembershipRole } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { getMemberships } from '../queries/get-memberships';

type UpdateMembershipRoleProps = {
  userId: string;
  organizationId: string;
  newRole: MembershipRole;
};

export async function updateMembershipRole({
  userId,
  organizationId,
  newRole,
}: UpdateMembershipRoleProps) {
  await getAdminOrRedirect(organizationId);
  const { memberships } = await getMemberships(organizationId);
  const isLastAdmin = memberships.filter((m) => m.role === 'ADMIN').length <= 1;

  const targetMembership = memberships.find(
    (m) => m.userId === userId && m.organizationId === organizationId
  );

  if (!targetMembership) {
    return toErrorActionState('Membership  not found');
  }

  if (
    isLastAdmin &&
    targetMembership.role === 'ADMIN' &&
    newRole === 'MEMBER'
  ) {
    return toErrorActionState("You can't change the role of the last admin.");
  }

  try {
    await prisma.membership.update({
      where: { membershipId: { userId, organizationId } },
      data: {
        role: newRole,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(membershipsPath(organizationId));
  return toSuccessActionState('The membership role has been updated.');
}
