import { CardCompact } from '@/components/card-compact';
import { Heading } from '@/components/heading';
import { getAuth } from '@/features/auth/queries/get-auth';
import { EmailEditForm } from '@/features/profile/components/email-edit-form';
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

      <div className="flex-1 flex gap-y-6 flex-col items-center">
        <CardCompact
          title="Edit Profile"
          description="Edit your profile information."
          className="w-full max-w-105 animate-fade-from-top"
          content={<ProfileEditForm user={user} />}
        />
        <CardCompact
          title="Email"
          description="Change your email address."
          className="w-full max-w-105 animate-fade-from-top"
          content={<EmailEditForm user={user} />}
        />
      </div>
    </div>
  );
}
