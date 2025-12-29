import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { User } from '@/generated/prisma/client';
import { getAuth } from '../queries/get-auth';

export function useAuth() {
  const [isFetched, setIsFetched] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      const { user } = await getAuth();
      setUser(user);
      setIsFetched(true);
    };
    fetchUser();
  }, [pathname]);

  return { user, isFetched };
}
