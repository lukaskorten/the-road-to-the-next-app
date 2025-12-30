import { redirect } from 'next/navigation';
import { signInPath } from '@/app/paths';
import { getAuth } from './get-auth';

export async function getAuthOrRedirect() {
  const { user } = await getAuth();
  if (!user) {
    redirect(signInPath());
  }
}
