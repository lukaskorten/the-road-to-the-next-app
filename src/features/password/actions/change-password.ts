'use server';

import z from 'zod';
import {
  ActionState,
  fromErrorToActionState,
  toErrorActionState,
  toSuccessActionState,
} from '@/components/form/utils/to-action-state';
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';
import { inngest } from '@/lib/inngest';
import { passwordReset } from '../events/reset-password-event';
import { verifyPassword } from '../utils/hash-and-verify';

const changePasswordSchema = z.object({
  password: z.string().min(6).max(191),
});

export async function changePassword(
  _actionState: ActionState,
  formData: FormData
) {
  const { user } = await getAuthOrRedirect();

  try {
    const { password } = changePasswordSchema.parse(
      Object.fromEntries(formData.entries())
    );

    const isPasswordValid = await verifyPassword(user.passwordHash, password);

    if (!isPasswordValid) {
      return toErrorActionState('Invalid password', formData);
    }

    await inngest.send(passwordReset.create({ userId: user.id }));
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  return toSuccessActionState('Check your email for reset instructions');
}
