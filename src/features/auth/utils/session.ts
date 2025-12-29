import { add, isPast, sub } from 'date-fns';
import { prisma } from '@/lib/prisma';
import { generateRandomToken, hashToken } from '@/utils/crypto';
import {
  deleteSessionCookie,
  getSessionCookieValue,
  setSessionCookie,
} from './session-cookie';

const SESSION_REFRESH_INTERVAL_DAYS = 15;
const SESSION_MAX_DURATION_DAYS = 30;

export async function createSession(userId: string) {
  const sessionToken = generateRandomToken();
  const sessionId = hashToken(sessionToken);

  const session = {
    id: sessionId,
    userId,
    expiresAt: add(new Date(), { days: SESSION_REFRESH_INTERVAL_DAYS }),
  };

  await prisma.session.create({ data: session });

  await setSessionCookie(sessionToken, session.expiresAt);
}

export async function validateSession() {
  const sessionToken = await getSessionCookieValue();
  const emptyResult = { user: null, session: null } as const;

  if (!sessionToken) {
    return emptyResult;
  }

  const sessionId = hashToken(sessionToken);

  const result = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });

  // if there is no session, return null
  if (!result) {
    return emptyResult;
  }

  const { user, ...session } = result;

  // if the session is expired, delete it
  if (isPast(session.expiresAt)) {
    await prisma.session.delete({ where: { id: sessionId } });
    return emptyResult;
  }

  // if 15 days are left until the session expires, refresh the session
  if (isPast(sub(session.expiresAt, { days: SESSION_REFRESH_INTERVAL_DAYS }))) {
    session.expiresAt = add(new Date(), { days: SESSION_MAX_DURATION_DAYS });
    await prisma.session.update({
      where: { id: sessionId },
      data: { expiresAt: session.expiresAt },
    });
    setSessionCookie(sessionToken, session.expiresAt);
  }

  return { session, user };
}

export async function invalidateSession(sessionId: string) {
  await prisma.session.delete({ where: { id: sessionId } });
  await deleteSessionCookie();
}
