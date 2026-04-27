import { serve } from 'inngest/next';
import { welcomeEvent } from '@/features/auth/events/welcome-event';
import { resetPasswordEvent } from '@/features/password/events/reset-password-event';
import { adminReportEvent } from '@/features/reports/events/admin-report-event';
import { inngest } from '@/lib/inngest';

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [adminReportEvent, resetPasswordEvent, welcomeEvent],
});
