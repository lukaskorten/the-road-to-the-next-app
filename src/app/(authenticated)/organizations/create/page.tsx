import { CardCompact } from '@/components/card-compact';
import { OrganizationCreateForm } from '@/features/organizations/components/organization-create-form';

export default function OrganizationCreatePage() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <CardCompact
        title="Create Organization"
        description="Create a new organization for your team"
        className="w-full max-w-105 animate-fade-from-top"
        content={<OrganizationCreateForm />}
      />
    </div>
  );
}
