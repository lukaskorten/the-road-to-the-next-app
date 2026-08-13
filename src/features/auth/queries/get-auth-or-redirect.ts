import { redirect } from 'next/navigation';
import {
  emailVerificationPath,
  onboardingPath,
  selectActiveOrganization,
  signInPath,
} from '@/app/paths';
import { getOrganizationsByUser } from '@/features/organizations/queries/get-organizations-by-user';
import { getAuth } from './get-auth';

type GetAuthOrRedirectOptions = {
  checkEmailVerified?: boolean;
  checkOrganizations?: boolean;
  checkActiveOrganization?: boolean;
};

export async function getAuthOrRedirect(options?: GetAuthOrRedirectOptions) {
  const {
    checkEmailVerified = true,
    checkOrganizations = true,
    checkActiveOrganization = true,
  } = options ?? {};

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

  if (checkOrganizations || checkActiveOrganization) {
    const organizations = await getOrganizationsByUser();

    if (!organizations.length && checkOrganizations) {
      redirect(onboardingPath());
    }

    const hasActive = organizations.some(
      (org) => org.membershipByUser.isActive
    );
    if (!hasActive && checkActiveOrganization) {
      redirect(selectActiveOrganization());
    }
  }

  return auth;
}
