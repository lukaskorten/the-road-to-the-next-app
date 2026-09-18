import { redirect } from 'next/navigation';
import { signInPath } from '@/app/paths';
import { getMembership } from '@/features/memberships/queries/get-membership';
import { getAuthOrRedirect } from './get-auth-or-redirect';

export async function getAdminOrRedirect(organizationId: string) {
  const auth = await getAuthOrRedirect();
  const membership = await getMembership({
    organizationId,
    userId: auth.user.id,
  });

  if (membership?.role === 'ADMIN') {
    return { ...auth, membership };
  }

  redirect(signInPath());
}
