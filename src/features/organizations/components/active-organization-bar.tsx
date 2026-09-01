import Link from 'next/link';
import { selectActiveOrganization } from '@/app/paths';

export default function ActiveOrganizationBar() {
  return (
    <div className="fixed bottom-4">
      <div className="bg-popover py-2 px-3 rounded-xl border text-xs flex gap-4">
        Active Organization: Org 2
        <Link href={selectActiveOrganization()} className="underline">
          Select Organization
        </Link>
      </div>
    </div>
  );
}
