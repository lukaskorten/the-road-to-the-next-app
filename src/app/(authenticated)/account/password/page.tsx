import { Heading } from '@/components/heading';
import { PasswordEditForm } from '@/features/password/components/password-edit-form';
import { AccountTabs } from '../_navigation/account-tabs';

export default function AccountPasswordPage() {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <AccountTabs />
      <Heading title="Password" description="Keep your account secure" />

      <div className="w-full max-w-105">
        <PasswordEditForm />
      </div>
    </div>
  );
}
