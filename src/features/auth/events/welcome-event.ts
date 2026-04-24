import { eventType, staticSchema } from 'inngest';
import { signInPath } from '@/app/paths';
import { inngest } from '@/lib/inngest';
import { prisma } from '@/lib/prisma';
import { getBaseUrl } from '@/utils/url';
import { sendWelcomeEmail } from '../emails/send-email-welcome';

type WelcomePayload = { userId: string };
export const welcome = eventType('app/welcome', {
  schema: staticSchema<WelcomePayload>(),
});

export const welcomeEvent = inngest.createFunction(
  {
    id: 'welcome',
    triggers: [welcome],
  },
  async ({ event, step }) => {
    const { userId } = event.data;
    await step.sleep('defer-welcome-email', 5 * 60 * 1000);

    await step.run('send-welcome-email', async () => {
      const user = await prisma.user.findUniqueOrThrow({
        where: { id: userId },
      });

      const { username, firstName, email } = user;
      const name = firstName ?? username;
      const loginUrl = getBaseUrl() + signInPath();
      await sendWelcomeEmail(name, email, loginUrl);
    });
  }
);
