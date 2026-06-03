'use server';

import { revalidatePath } from 'next/cache';
import { setCookie } from '@/actions/cookies';
import { emailVerificationPath } from '@/app/paths';
import {
  fromErrorToActionState,
  toSuccessActionState,
} from '@/components/form/utils/to-action-state';
import { EmailVerificationPurpose } from '@/generated/prisma/enums';
import { sendVerificationCodeEmail } from '../emails/send-verification-code-email';
import { getAuthOrRedirect } from '../queries/get-auth-or-redirect';
import { generateEmailVerificationToken } from '../utils/generate-email-verification-token';

export async function resendEmailVerificationCode() {
  const { user } = await getAuthOrRedirect({ checkEmailVerified: false });

  const email = user.pendingEmail || user.email;
  const purpose = user.pendingEmail
    ? EmailVerificationPurpose.EMAIL_CHANGE
    : EmailVerificationPurpose.SIGN_UP;

  try {
    const code = await generateEmailVerificationToken(user.id, email, purpose);
    await sendVerificationCodeEmail(email, user.username, code);
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(emailVerificationPath());
  setCookie('toast', 'Verification code resent. Check your email.');
  return toSuccessActionState('Verification code resent. Check your email.');
}
