import { isPast } from 'date-fns';
import { prisma } from '@/lib/prisma';

export async function validateEmailVerificationCode(
  userId: string,
  email: string,
  code: string
) {
  const token = await prisma.emailVerificationToken.findFirst({
    where: { userId },
  });

  if (!token || token.code !== code) {
    return false;
  }

  await prisma.emailVerificationToken.delete({ where: { id: token.id } });

  if (isPast(token.expiresAt) || token.email !== email) {
    return false;
  }

  return true;
}
