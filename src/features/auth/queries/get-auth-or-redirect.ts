import { redirect } from 'next/navigation';
import { emailVerificationPath, onboardingPath, signInPath } from '@/app/paths';
import { getOrganizationsByUser } from '@/features/organizations/queries/get-organizations-by-user';
import { getAuth } from './get-auth';

type GetAuthOrRedirectOptions = {
  checkEmailVerified?: boolean;
  checkOrganizations?: boolean;
};

export async function getAuthOrRedirect(options?: GetAuthOrRedirectOptions) {
  const { checkEmailVerified = true, checkOrganizations = true } =
    options ?? {};

  const auth = await getAuth();
  if (!auth.user) {
    redirect(signInPath());
  }

  if (
    checkEmailVerified &&
    (!auth.user.emailVerified || auth.user.pendingEmail)
  ) {
    redirect(emailVerificationPath());
  }

  if (checkOrganizations) {
    const organizations = await getOrganizationsByUser();
    if (!organizations.length) {
      redirect(onboardingPath());
    }
  }

  return auth;
}
