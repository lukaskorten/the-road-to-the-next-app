import { Suspense } from 'react';
import { Heading } from '@/components/heading';
import { Spinner } from '@/components/spinner';
import MembershipsList from '@/features/memberships/components/memberships-list';

type MembershipsPageProps = {
  params: Promise<{ organizationId: string }>;
};

export default async function MembershipsPage({
  params,
}: MembershipsPageProps) {
  const { organizationId } = await params;

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Memberships"
        description="Manage members in your organization"
      />

      <Suspense fallback={<Spinner />}>
        <MembershipsList organizationId={organizationId} />
      </Suspense>
    </div>
  );
}
