import { CardCompact } from '@/components/card-compact';
import { PasswordForgotForm } from '@/features/password/components/password-forgot-form';

export default function PasswordForgotPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <CardCompact
        title="Forgot Password"
        description="Enter your email address and we'll send you a link to reset your password."
        className="w-full max-w-105 animate-fade-from-top"
        content={<PasswordForgotForm />}
      />
    </div>
  );
}
