import { LucidePlus } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { organizationCreatePath } from '@/app/paths';
import { Heading } from '@/components/heading';
import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button';
import OrganizationList from '@/features/organizations/components/organization-list';

export default function OrganizationsPage() {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Organizations"
        description="All your organizations at one place"
        actions={
          <Button asChild>
            <Link href={organizationCreatePath()}>
              <LucidePlus className="mr-2 h-4 w-4" />
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
