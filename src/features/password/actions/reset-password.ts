'use server';

import { isPast } from 'date-fns';
import { redirect } from 'next/navigation';
import z from 'zod';
import { setCookie } from '@/actions/cookies';
import { signInPath } from '@/app/paths';
import {
  ActionState,
  fromErrorToActionState,
  toErrorActionState,
} from '@/components/form/utils/to-action-state';
import { prisma } from '@/lib/prisma';
import { hashToken } from '@/utils/crypto';
import { hashPassword } from '../utils/hash-and-verify';

const resetPasswordSchema = z
  .object({
    password: z.string().min(6).max(191),
    confirmPassword: z.string().min(6).max(191),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: "Passwords don't match",
        path: ['confirmPassword'],
      });
    }
  });

export async function resetPassword(
  token: string,
  _: ActionState,
  formData: FormData
) {
  try {
    const { password } = resetPasswordSchema.parse(
      Object.fromEntries(formData.entries())
    );

    const tokenHash = hashToken(token);
    const resetPasswordToken = await prisma.resetPaswordToken.findUnique({
      where: { tokenHash },
    });

    if (!resetPasswordToken || isPast(resetPasswordToken.expiresAt)) {
      return toErrorActionState(
        'The password reset token is either invalid or has expired.',
        formData
      );
    }

    const { userId } = resetPasswordToken;
    const passwordHash = await hashPassword(password);
    await prisma.user.update({
      where: { id: userId },
      data: { passwordHash },
    });

    await prisma.resetPaswordToken.deleteMany({ where: { userId } });
    await prisma.session.deleteMany({ where: { userId } });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  await setCookie(
    'toast',
    'Password reset successful. Please sign in with your new password.'
  );
  redirect(signInPath());
}
