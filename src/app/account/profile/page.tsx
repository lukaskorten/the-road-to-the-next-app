import { Heading } from '@/components/heading';
import { AccountTabs } from '@/features/account/components/account-tabs';

export default function AccountProfilePage() {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <AccountTabs />
      <Heading title="Profile" description="All your profile information" />
    </div>
  );
}
