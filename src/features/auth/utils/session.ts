import { Cookie } from 'lucia';
import { cookies } from 'next/headers';
import { lucia } from '@/lib/lucia';

export async function createSession(userId: string) {
  const session = await lucia.createSession(userId, {});
  await setSessionCookie(session.id);
}

export async function setSessionCookie(sessionId: string) {
  const sessionCookie = lucia.createSessionCookie(sessionId);
  await setCookie(sessionCookie);
}

export async function setBlankSessionCookie() {
  const sessionCookie = lucia.createBlankSessionCookie();
  await setCookie(sessionCookie);
}

async function setCookie(cookie: Cookie) {
  (await cookies()).set(cookie.name, cookie.value, cookie.attributes);
}
