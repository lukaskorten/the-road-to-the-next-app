import Link from 'next/link';
import { selectActiveOrganization } from '@/app/paths';
import { getActiveOrganization } from '../queries/get-active-organization';

export default async function ActiveOrganizationBar() {
  const activeOrganization = await getActiveOrganization();

  if (activeOrganization === undefined) return null;

  return (
    <div className="fixed bottom-4">
      <div className="bg-popover py-2 px-3 rounded-lg border text-xs flex gap-4">
        Active Organization: {activeOrganization?.name ?? 'None'}
        {!activeOrganization && (
          <Link href={selectActiveOrganization()} className="underline">
            Select Organization
          </Link>
        )}
      </div>
    </div>
  );
}
