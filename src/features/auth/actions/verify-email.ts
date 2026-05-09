'use server';

import { redirect } from 'next/navigation';
import z from 'zod';
import { setCookie } from '@/actions/cookies';
import { ticketsPath } from '@/app/paths';
import {
  ActionState,
  fromErrorToActionState,
  toErrorActionState,
} from '@/components/form/utils/to-action-state';
import { prisma } from '@/lib/prisma';
import { getAuthOrRedirect } from '../queries/get-auth-or-redirect';
import { createSession } from '../utils/session';
import { validateEmailVerificationCode } from '../utils/validate-email-verification-code';

const emailVerificationSchema = z.object({
  code: z.string().length(8, 'Verification code must be 8 characters'),
});

export async function verifyEmail(_: ActionState, formData: FormData) {
  const { user } = await getAuthOrRedirect();

  try {
    const { code } = emailVerificationSchema.parse(
      Object.fromEntries(formData.entries())
    );

    const isValidCode = await validateEmailVerificationCode(
      user.id,
      user.email,
      code
    );

    if (!isValidCode) {
      return toErrorActionState('Invalid or expired code');
    }

    await prisma.session.deleteMany({ where: { userId: user.id } });
    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: true },
    });

    await createSession(user.id);
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  await setCookie('toast', 'Email verified');
  redirect(ticketsPath());
}
