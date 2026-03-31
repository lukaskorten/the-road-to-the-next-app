'use server';

import z from 'zod';
import {
  ActionState,
  fromErrorToActionState,
  toErrorActionState,
  toSuccessActionState,
} from '@/components/form/utils/to-action-state';
import { sendEmailPasswordReset } from '@/features/password/emails/send-email-password-reset';
import { prisma } from '@/lib/prisma';
import { generatePasswordResetLink } from '../utils/generate-password-reset-link';

const forgotPasswordSchema = z.object({
  email: z.email().min(1).max(191),
});

export async function forgotPassword(_: ActionState, formData: FormData) {
  try {
    const { email } = forgotPasswordSchema.parse(
      Object.fromEntries(formData.entries())
    );

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return toErrorActionState('Invalid email', formData);
    }

    const link = await generatePasswordResetLink(user.id);
    await sendEmailPasswordReset(user.username, user.email, link);
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  return toSuccessActionState('Check your email for reset instructions');
}
