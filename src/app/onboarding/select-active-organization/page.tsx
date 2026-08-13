import { LucidePlus } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { onboardingPath, organizationsPath } from '@/app/paths';
import { Heading } from '@/components/heading';
import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button';
import OrganizationList from '@/features/organizations/components/organization-list';
import { getOrganizationsByUser } from '@/features/organizations/queries/get-organizations-by-user';

export default async function SelectActiveOrganizationPage() {
  const organizations = await getOrganizationsByUser();
  const hasActive = organizations.some((org) => org.membershipByUser.isActive);

  if (hasActive) {
    redirect(organizationsPath());
  }

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Select Active Organization"
        description="Choose the organization you want to be active in"
        actions={
          <Button asChild>
            <Link href={onboardingPath()}>
              <LucidePlus />
              New Organization
            </Link>
          </Button>
        }
      />

      <Suspense fallback={<Spinner />}>
        <OrganizationList />
      </Suspense>
    </div>
  );
}
