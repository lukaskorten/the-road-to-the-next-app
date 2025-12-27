'use server';

import { verify } from '@node-rs/argon2';
import { redirect } from 'next/navigation';
import z from 'zod';
import { ticketsPath } from '@/app/paths';
import {
  ActionState,
  fromErrorToActionState,
  toErrorActionState,
} from '@/components/form/utils/to-action-state';
import { prisma } from '@/lib/prisma';
import { createSession } from '../utils/create-session';

const signInSchema = z.object({
  email: z.email().min(1).max(191),
  password: z.string().min(6, 'Password is required').max(191),
});

export async function signIn(_: ActionState, formData: FormData) {
  try {
    const { email, password } = signInSchema.parse(
      Object.fromEntries(formData.entries())
    );

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return toErrorActionState('Invalid email or password', formData);
    }

    const isPasswordValid = await verify(user.passwordHash, password);
    if (!isPasswordValid) {
      return toErrorActionState('Invalid email or password', formData);
    }

    await createSession(user.id);
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  redirect(ticketsPath());
}
