import EmailPasswordReset from '@/emails/password/email-password-reset';
import { resend } from '@/lib/resend';

export async function sendEmailPasswordReset(
  username: string,
  email: string,
  resetPasswordLink: string
) {
  return await resend.emails.send({
    from: 'no-reply@app.tickets.code-snacks.de',
    to: email,
    subject: 'Password Reset form TicketBounty',
    react: EmailPasswordReset({ toName: username, url: resetPasswordLink }),
  });
}
