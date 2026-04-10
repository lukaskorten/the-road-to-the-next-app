import { inngest } from '@/lib/inngest';
import { prisma } from '@/lib/prisma';
import { sendEmailPasswordReset } from '../emails/send-email-password-reset';
import { generatePasswordResetLink } from '../utils/generate-password-reset-link';

export const resetPasswordEvent = inngest.createFunction(
  { id: 'reset-password', triggers: { event: 'app/password.reset' } },
  async ({ event }) => {
    const { userId } = event.data;

    const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });
    const link = await generatePasswordResetLink(user.id);
    const result = await sendEmailPasswordReset(
      user.username,
      user.email,
      link
    );

    return { event, body: result };
  }
);
