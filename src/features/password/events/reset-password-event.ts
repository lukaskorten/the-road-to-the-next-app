import { eventType, staticSchema } from 'inngest';
import { inngest } from '@/lib/inngest';
import { prisma } from '@/lib/prisma';
import { sendEmailPasswordReset } from '../emails/send-email-password-reset';
import { generatePasswordResetLink } from '../utils/generate-password-reset-link';

type PasswordResetPayload = { userId: string };

export const passwordResetEvent = eventType('app/password.reset', {
  schema: staticSchema<PasswordResetPayload>(),
});

export const resetPassword = inngest.createFunction(
  { id: 'reset-password', triggers: [passwordResetEvent] },
  async ({ event }) => {
    const { userId } = event.data;

    const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });
    const link = await generatePasswordResetLink(user.id);
    const result = await sendEmailPasswordReset(
      user.username,
      user.email,
      link
    );

    if (result.error) {
      throw new Error(`${result.error.name}: ${result.error.message}`);
    }

    return { event, body: result };
  }
);
