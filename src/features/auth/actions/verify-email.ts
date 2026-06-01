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
import { EmailVerificationPurpose } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { getAuthOrRedirect } from '../queries/get-auth-or-redirect';
import { createSession } from '../utils/session';
import { validateEmailVerificationCode } from '../utils/validate-email-verification-code';

const emailVerificationSchema = z.object({
  code: z.string().length(8, 'Verification code must be 8 characters'),
});

export async function verifyEmail(_: ActionState, formData: FormData) {
  const { user } = await getAuthOrRedirect({ checkEmailVerified: false });

  try {
    const { code } = emailVerificationSchema.parse(
      Object.fromEntries(formData.entries())
    );

    const { valid, purpose } = await validateEmailVerificationCode({
      userId: user.id,
      email: user.email,
      pendingEmail: user.pendingEmail,
      code,
    });

    if (!valid) {
      return toErrorActionState('Invalid or expired code');
    }

    await prisma.session.deleteMany({ where: { userId: user.id } });

    const isEmailChange = purpose === EmailVerificationPurpose.EMAIL_CHANGE;

    if (isEmailChange && user.pendingEmail) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          email: user.pendingEmail,
          pendingEmail: null,
        },
      });
    } else {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: true },
      });
    }

    await createSession(user.id);
    await setCookie(
      'toast',
      isEmailChange ? 'Email changed' : 'Email verified'
    );
    redirect(ticketsPath());
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }
}
