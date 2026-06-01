'use server';

import { revalidatePath } from 'next/cache';
import z from 'zod';
import { accountProfilePath } from '@/app/paths';
import {
  ActionState,
  fromErrorToActionState,
  toErrorActionState,
  toSuccessActionState,
} from '@/components/form/utils/to-action-state';
import { sendVerificationCodeEmail } from '@/features/auth/emails/send-verification-code-email';
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';
import { generateEmailVerificationToken } from '@/features/auth/utils/generate-email-verification-token';
import { EmailVerificationPurpose, Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';

const updateEmailSchema = z.object({
  email: z.email().min(1).max(191),
});

export async function updateEmail(
  _actionState: ActionState,
  formData: FormData
) {
  const { user } = await getAuthOrRedirect();
  try {
    const { email } = updateEmailSchema.parse(
      Object.fromEntries(formData.entries())
    );

    const existingUserCount = await prisma.user.count({ where: { email } });
    if (existingUserCount > 0) {
      return toErrorActionState('Email is already in use', formData);
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        pendingEmail: email,
        pendingEmailRequestedAt: new Date(),
      },
    });

    const code = await generateEmailVerificationToken(
      user.id,
      email,
      EmailVerificationPurpose.EMAIL_CHANGE
    );

    await sendVerificationCodeEmail(email, user.username, code);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return toErrorActionState('Email is already in use', formData);
    }
    return fromErrorToActionState(error, formData);
  }

  revalidatePath(accountProfilePath());
  return toSuccessActionState(
    'Check your email for the verification code',
    formData
  );
}
