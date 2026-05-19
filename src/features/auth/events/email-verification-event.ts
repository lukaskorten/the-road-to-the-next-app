import { eventType, staticSchema } from 'inngest';
import { inngest } from '@/lib/inngest';
import { prisma } from '@/lib/prisma';
import { sendVerificationCodeEmail } from '../emails/send-verification-code-email';
import { generateEmailVerificationToken } from '../utils/generate-email-verification-token';

type EmailVerificationPayload = { userId: string };

export const emailVerificationEvent = eventType('app/auth.email-verification', {
  schema: staticSchema<EmailVerificationPayload>(),
});

export const emailVerification = inngest.createFunction(
  { id: 'email-verification', triggers: [emailVerificationEvent] },
  async ({ event }) => {
    const { userId } = event.data;

    const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });
    const code = await generateEmailVerificationToken(user.id, user.email);
    const result = await sendVerificationCodeEmail(
      user.email,
      user.username,
      code
    );

    if (result.error) {
      throw new Error(`${result.error.name}: ${result.error.message}`);
    }

    return { event, body: result };
  }
);
