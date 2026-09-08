import { Suspense } from 'react';
import { Heading } from '@/components/heading';
import { Spinner } from '@/components/spinner';

type MembershipsPageProps = {
  params: Promise<{ organizationId: string }>;
};

export default async function MembershipsPage({
  params,
}: MembershipsPageProps) {
  const { organizationId } = await params;

  // todo: query to load all memberships for the organization
  // todo: create a memberships list component
  // todo: use suspense to load the memberships list component
  // todo: use a table to display memberships and leave an empty column for action buttons

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Memberships"
        description="Manage members in your organization"
      />

      <Suspense fallback={<Spinner />}></Suspense>
    </div>
  );
}
