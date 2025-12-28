import { cookies } from 'next/headers';
import { cache } from 'react';
import { lucia } from '@/lib/lucia';
import { setBlankSessionCookie, setSessionCookie } from '../utils/session';

export const getAuth = cache(async () => {
  const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value;

  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await lucia.validateSession(sessionId);

  try {
    // This part only works in a server action context
    // because next/headers is not available in RSC

    if (result.session && result.session.fresh) {
      await setSessionCookie(result.session.id);
    }

    if (!result.session) {
      await setBlankSessionCookie();
    }
  } catch {
    // do nothing if used in a RSC context
  }

  return result;
});
