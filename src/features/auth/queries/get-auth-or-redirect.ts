import { redirect } from 'next/navigation';
import { signInPath } from '@/app/paths';
import { getAuth } from './get-auth';

export async function getAuthOrRedirect() {
  const auth = await getAuth();
  if (!auth.user) {
    redirect(signInPath());
  }

  return auth;
}
