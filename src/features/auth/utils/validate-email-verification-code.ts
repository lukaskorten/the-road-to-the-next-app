import { isPast } from 'date-fns';
import { EmailVerificationPurpose } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';

type ValidateEmailVerificationParams = {
  userId: string;
  email: string;
  pendingEmail: string | null;
  code: string;
};

type ValidateEmailVerificationResult = {
  valid: boolean;
  purpose?: EmailVerificationPurpose;
};

export async function validateEmailVerificationCode({
  userId,
  email,
  pendingEmail,
  code,
}: ValidateEmailVerificationParams): Promise<ValidateEmailVerificationResult> {
  const token = await prisma.emailVerificationToken.findFirst({
    where: { userId },
  });

  if (!token || token.code !== code) {
    return { valid: false };
  }

  await prisma.emailVerificationToken.delete({ where: { id: token.id } });
  const isEmailChange = token.purpose === EmailVerificationPurpose.EMAIL_CHANGE;

  if (
    isPast(token.expiresAt) ||
    (token.email !== email && !isEmailChange) ||
    (isEmailChange && token.email !== pendingEmail)
  ) {
    return {
      valid: false,
      purpose: token.purpose,
    };
  }

  return {
    valid: true,
    purpose: token.purpose,
  };
}
