import { addMilliseconds } from 'date-fns';
import { EmailVerificationPurpose } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { generateRandomCode } from '@/utils/crypto';

const CODE_EXPIRATION_TIME_MS = 1000 * 60 * 60 * 2; // 2 hours

export async function generateEmailVerificationToken(
  userId: string,
  email: string,
  purpose: EmailVerificationPurpose = EmailVerificationPurpose.SIGN_UP
) {
  await prisma.emailVerificationToken.deleteMany({ where: { userId } });

  const code = generateRandomCode();
  const expiresAt = addMilliseconds(new Date(), CODE_EXPIRATION_TIME_MS);

  await prisma.emailVerificationToken.create({
    data: { userId, email, code, expiresAt, purpose },
  });

  return code;
}
