import { serve } from 'inngest/next';
import { emailVerification } from '@/features/auth/events/email-verification-event';
import { welcome } from '@/features/auth/events/welcome-event';
import { resetPassword } from '@/features/password/events/reset-password-event';
import { adminReportJob } from '@/features/reports/jobs/admin-report-job';
import { inngest } from '@/lib/inngest';

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [adminReportJob, resetPassword, welcome, emailVerification],
});
