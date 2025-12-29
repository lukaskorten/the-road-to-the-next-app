'use server';

import { redirect } from 'next/navigation';
import { signInPath } from '@/app/paths';
import { getAuth } from '../queries/get-auth';
import { invalidateSession } from '../utils/session';

export async function signOut() {
  const { session } = await getAuth();

  if (!session) {
    redirect(signInPath());
  }

  await invalidateSession(session.id);

  redirect(signInPath());
}
