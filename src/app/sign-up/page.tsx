import Link from 'next/link';
import { CardCompact } from '@/components/card-compact';
import { SignUpForm } from '@/features/auth/components/sign-up-form';
import { signInPath } from '../paths';

export default function SignUpPage() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <CardCompact
        title="Sign Up"
        description="Create an account to get started"
        className="w-full max-w-105 animate-fade-from-top"
        content={<SignUpForm />}
        footer={
          <Link
            href={signInPath()}
            className="text-sm text-muted-foreground underline"
          >
            Have an account? Sign In now.
          </Link>
        }
      />
    </div>
  );
}
