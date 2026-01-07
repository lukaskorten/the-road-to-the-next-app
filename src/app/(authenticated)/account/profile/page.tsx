import { Heading } from '@/components/heading';
import { getAuth } from '@/features/auth/queries/get-auth';
import { ProfileEditForm } from '@/features/profile/components/profile-edit-form';
import { AccountTabs } from '../_navigation/account-tabs';

export default async function AccountProfilePage() {
  const { user } = await getAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <AccountTabs />
      <Heading title="Profile" description="All your profile information" />

      <div className="w-full max-w-105">
        <ProfileEditForm user={user} />
      </div>
    </div>
  );
}
