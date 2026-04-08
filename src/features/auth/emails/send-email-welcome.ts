import { FROM_EMAIL } from '@/constants/emails';
import WelcomeEmail from '@/emails/auth/welcome-email';
import { resend } from '@/lib/resend';

export async function sendWelcomeEmail(
  username: string,
  email: string,
  loginUrl: string
) {
  return await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: 'Welcome to TicketBounty!',
    react: WelcomeEmail({
      toName: username,
      loginUrl: loginUrl,
    }),
  });
}
