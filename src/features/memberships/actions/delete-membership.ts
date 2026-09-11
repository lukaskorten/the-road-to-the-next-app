'use server';

import { toSuccessActionState } from '@/components/form/utils/to-action-state';

export async function deleteMembership(userId: string, organizationId: string) {
  // todo: delete the membership of the user and organizaation

  return toSuccessActionState('Membership deleted!');
}
