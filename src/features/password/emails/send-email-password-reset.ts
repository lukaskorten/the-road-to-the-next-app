import { FROM_EMAIL } from '@/constants/emails';
import PasswordResetEmail from '@/emails/password/password-reset-email';
import { resend } from '@/lib/resend';

export async function sendEmailPasswordReset(
  username: string,
  email: string,
  resetPasswordLink: string
) {
  return await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: 'Password Reset Request from TicketBounty',
    react: PasswordResetEmail({
      toName: username,
      userEmail: email,
      resetUrl: resetPasswordLink,
    }),
  });
}
