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
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';
import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';

const updateUserSchema = z.object({
  username: z
    .string()
    .min(1)
    .max(191)
    .refine((value) => !value.includes(' '), 'Username cannot contain spaces'),
  avatarUrl: z.url().optional(),
  firstName: z.string().max(191).optional(),
  lastName: z.string().max(191).optional(),
});

export async function updateProfile(
  _actionState: ActionState,
  formData: FormData
) {
  const { user } = await getAuthOrRedirect();

  try {
    const data = updateUserSchema.parse({
      ...user,
      username: formData.get('username'),
      avatarUrl: formData.get('avatarUrl'),
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
    });

    await prisma.user.update({
      where: { id: user.id },
      data,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return toErrorActionState('Username is already in use', formData);
    }
    return fromErrorToActionState(error, formData);
  }

  revalidatePath(accountProfilePath());
  return toSuccessActionState('Profile updated successfully');
}
