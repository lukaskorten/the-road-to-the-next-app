import { addMilliseconds } from 'date-fns';
import { passwordResetPath } from '@/app/paths';
import { prisma } from '@/lib/prisma';
import { generateRandomToken, hashToken } from '@/utils/crypto';
import { getBaseUrl } from '@/utils/url';

const TOKEN_EXPIRATION_TIME_MS = 1000 * 60 * 60 * 2; // 2 hours

export async function generatePasswordResetLink(userId: string) {
  prisma.resetPaswordToken.deleteMany({ where: { userId } });

  const token = generateRandomToken();
  const tokenHash = hashToken(token);
  const expiresAt = addMilliseconds(new Date(), TOKEN_EXPIRATION_TIME_MS);

  await prisma.resetPaswordToken.create({
    data: { userId, tokenHash, expiresAt },
  });

  return `${getBaseUrl()}${passwordResetPath()}/${token}`;
}
