import { CardCompact } from '@/components/card-compact';
import { PasswordResetForm } from '@/features/password/components/password-reset-form';

type PasswordResetPageProps = {
  params: Promise<{ token: string }>;
};

export default async function PasswordResetPage({
  params,
}: PasswordResetPageProps) {
  const { token } = await params;
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <CardCompact
        title="Reset Password"
        description="Enter your new password and confirm it."
        className="w-full max-w-105 animate-fade-from-top"
        content={<PasswordResetForm token={token} />}
      />
    </div>
  );
}
