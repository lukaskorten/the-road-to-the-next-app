import { serve } from 'inngest/next';
import { resetPasswordEvent } from '@/features/password/events/reset-password-event';
import { inngest } from '@/lib/inngest';

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [resetPasswordEvent],
});
