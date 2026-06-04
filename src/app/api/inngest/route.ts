import { serve } from 'inngest/next';
import { startEmailVerification } from '@/features/auth/events/start-email-verification';
import { welcome } from '@/features/auth/events/welcome';
import { resetPassword } from '@/features/password/events/reset-password-event';
import { adminReportJob } from '@/features/reports/jobs/admin-report-job';
import { inngest } from '@/lib/inngest';

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [adminReportJob, resetPassword, welcome, startEmailVerification],
});
