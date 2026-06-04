'use client';

import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { resendEmailVerificationCode } from '../actions/resend-email-verification-code';

export function ResendEmailVerificationCodeButton() {
  const handleResendCode = async () => {
    const resendPromise = resendEmailVerificationCode();
    toast.promise(resendPromise, {
      loading: 'Resending verification code...',
    });

    const result = await resendPromise;

    if (result.status === 'ERROR') {
      toast.error(result.message);
    } else if (result.status === 'SUCCESS') {
      toast.success(result.message);
    }
  };

  return (
    <Button variant="outline" className="mt-4" onClick={handleResendCode}>
      Resend Code
    </Button>
  );
}
