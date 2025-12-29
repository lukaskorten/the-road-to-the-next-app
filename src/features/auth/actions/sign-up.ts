'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { ticketsPath } from '@/app/paths';
import {
  ActionState,
  fromErrorToActionState,
  toErrorActionState,
} from '@/components/form/utils/to-action-state';
import { hashPassword } from '@/features/password/utils/hash-and-verify';
import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { createSession } from '../utils/session';

const signUpSchema = z
  .object({
    username: z
      .string()
      .min(1)
      .max(191)
      .refine(
        (value) => !value.includes(' '),
        'Username cannot contain spaces'
      ),
    email: z.email().min(1).max(191),
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

export async function signUp(_: ActionState, formData: FormData) {
  try {
    const { username, email, password } = signUpSchema.parse(
      Object.fromEntries(formData.entries())
    );

    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: { username, email, passwordHash },
    });

    await createSession(user.id);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return toErrorActionState(
        'Either email or username is already in use',
        formData
      );
    }

    return fromErrorToActionState(error, formData);
  }

  redirect(ticketsPath());
}
