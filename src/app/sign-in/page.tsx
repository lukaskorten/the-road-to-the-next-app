import Link from 'next/link';
import { CardCompact } from '@/components/card-compact';
import { SignInForm } from '@/features/auth/components/sign-in-form';
import { passwordForgotPath, signUpPath } from '../paths';

export default function SignInPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <CardCompact
        title="Sign In"
        description="Sign in to your account"
        className="w-full max-w-105 animate-fade-from-top"
        content={<SignInForm />}
        footer={
          <div className="flex w-full justify-between">
            <Link
              href={signUpPath()}
              className="text-sm text-muted-foreground underline"
            >
              No account yet?
            </Link>
            <Link
              href={passwordForgotPath()}
              className="text-sm text-muted-foreground underline"
            >
              Forgot your password?
            </Link>
          </div>
        }
      />
    </div>
  );
}
