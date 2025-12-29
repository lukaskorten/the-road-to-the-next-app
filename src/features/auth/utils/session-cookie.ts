import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'session';

type CookieAttributes = {
  httpOnly: boolean;
  sameSite: 'lax';
  secure: boolean;
  path: string;
  expires?: Date;
  maxAge?: number;
};

type Cookie = {
  name: string;
  value: string;
  attributes: CookieAttributes;
};

type SessionCookieProps = {
  value?: string;
  expiresAt?: Date;
  maxAge?: number;
};

export async function setSessionCookie(sessionToken: string, expiresAt: Date) {
  await setCookie(createSessionCookie({ value: sessionToken, expiresAt }));
}

export async function getSessionCookieValue() {
  return (await cookies()).get(SESSION_COOKIE_NAME)?.value;
}

export async function deleteSessionCookie() {
  await setCookie(createSessionCookie({ maxAge: 0 }));
}

function createSessionCookie({
  value = '',
  expiresAt,
  maxAge,
}: SessionCookieProps): Cookie {
  return {
    name: SESSION_COOKIE_NAME,
    value,
    attributes: {
      httpOnly: true,
      sameSite: 'lax' as const,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      expires: expiresAt,
      maxAge,
    },
  };
}

async function setCookie(cookie: Cookie) {
  (await cookies()).set(cookie.name, cookie.value, cookie.attributes);
}
