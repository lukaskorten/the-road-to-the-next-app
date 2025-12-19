'use server';

import { cookies } from 'next/headers';

export async function getCookie(key: string): Promise<string | null> {
  const cookie = (await cookies()).get(key);
  return cookie ? cookie.value : null;
}

export async function consumeCookie(key: string): Promise<string | null> {
  const value = await getCookie(key);
  if (value) {
    await deleteCookie(key);
  }
  return value;
}

export async function setCookie(key: string, value: string): Promise<void> {
  (await cookies()).set(key, value);
}

export async function deleteCookie(key: string): Promise<void> {
  (await cookies()).delete(key);
}
