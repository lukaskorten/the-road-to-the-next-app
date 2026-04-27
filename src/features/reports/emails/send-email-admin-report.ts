import { FROM_EMAIL } from '@/constants/emails';
import AdminReportEmail from '@/emails/reports/admin-report-email';
import { resend } from '@/lib/resend';

type SendAdminReportEmailOptions = {
  from: Date;
  to: Date;
  registeredUsersCount: number;
  createdTicketsCount: number;
};

export async function sendAdminReportEmail({
  from,
  to,
  registeredUsersCount,
  createdTicketsCount,
}: SendAdminReportEmailOptions) {
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail) {
    throw new Error('ADMIN_EMAIL is not configured');
  }

  return await resend.emails.send({
    from: FROM_EMAIL,
    to: adminEmail,
    subject: 'TicketBounty Admin Report',
    react: AdminReportEmail({
      from,
      to,
      registeredUsersCount,
      createdTicketsCount,
    }),
  });
}
