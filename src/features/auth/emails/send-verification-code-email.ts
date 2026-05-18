import { FROM_EMAIL } from '@/constants/emails';
import VerificationCodeEmail from '@/emails/auth/verification-code-email';
import { resend } from '@/lib/resend';

export async function sendVerificationCodeEmail(
  to: string,
  toName: string,
  code: string
) {
  return await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: 'Your verification code for TicketBounty',
    react: VerificationCodeEmail({ toName, code }),
  });
}
