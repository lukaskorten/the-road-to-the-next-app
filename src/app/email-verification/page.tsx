import { CardCompact } from '@/components/card-compact';
import { EmailVerificationForm } from '@/features/auth/components/email-verification-form';

export default function EmailVerificationPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <CardCompact
        title="Email Verification"
        description="Please enter the verification code sent to your email."
        className="w-full max-w-105 animate-fade-from-top"
        content={<EmailVerificationForm />}
      />
    </div>
  );
}
