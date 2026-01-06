'use server';

import z from 'zod';
import {
  ActionState,
  fromErrorToActionState,
  toErrorActionState,
  toSuccessActionState,
} from '@/components/form/utils/to-action-state';
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';
import { prisma } from '@/lib/prisma';
import { hashPassword, verifyPassword } from '../utils/hash-and-verify';

const passwordUpdateSchema = z
  .object({
    currentPassword: z.string().min(6).max(191),
    newPassword: z.string().min(6).max(191),
    confirmPassword: z.string().min(6).max(191),
  })
  .superRefine(({ newPassword, confirmPassword }, ctx) => {
    if (newPassword !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: "Passwords don't match",
        path: ['confirmPassword'],
      });
    }
  });

export async function updatePassword(
  _actionState: ActionState,
  formData: FormData
) {
  const { user } = await getAuthOrRedirect();

  try {
    const { currentPassword, newPassword } = passwordUpdateSchema.parse(
      Object.fromEntries(formData.entries())
    );

    const isCurrentPasswordValid = await verifyPassword(
      user.passwordHash,
      currentPassword
    );

    if (!isCurrentPasswordValid) {
      return toErrorActionState('Invalid password', formData);
    }

    const newPasswordHash = await hashPassword(newPassword);
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: newPasswordHash },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  return toSuccessActionState('Password successfully updated');
}
