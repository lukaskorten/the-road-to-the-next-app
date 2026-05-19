import { subHours } from 'date-fns';
import { inngest } from '@/lib/inngest';
import { prisma } from '@/lib/prisma';
import { sendAdminReportEmail } from '../emails/send-email-admin-report';

function getReportWindow() {
  const to = new Date();
  const windowHours = getAdminReportWindowHours();
  const from = subHours(to, windowHours);

  return { from, to };
}

function getAdminReportWindowHours() {
  const configuredHours = Number(process.env.ADMIN_REPORT_WINDOW_HOURS);
  const windowHours =
    Number.isFinite(configuredHours) && configuredHours > 0
      ? configuredHours
      : 24;
  return windowHours;
}

export const adminReportJob = inngest.createFunction(
  {
    id: 'admin-report',
    name: 'Admin Report',
    triggers: [{ cron: '0 8 * * *' }],
  },
  async ({ step }) => {
    const { from, to } = getReportWindow();

    const report = await step.run('collect-admin-report', async () => {
      const [registeredUsersCount, createdTicketsCount] = await Promise.all([
        prisma.user.count({
          where: { createdAt: { gte: from, lt: to } },
        }),
        prisma.ticket.count({
          where: { createdAt: { gte: from, lt: to } },
        }),
      ]);

      return { registeredUsersCount, createdTicketsCount };
    });

    const result = await step.run('send-admin-report-email', async () => {
      return await sendAdminReportEmail({
        from,
        to,
        ...report,
      });
    });

    if (result.error) {
      throw new Error(`${result.error.name}: ${result.error.message}`);
    }

    return { from, to, ...report };
  }
);
