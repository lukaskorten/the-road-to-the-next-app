'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { consumeCookie } from '@/actions/cookies';

export function RedirectToast() {
  const pathname = usePathname();
  useEffect(() => {
    const showCookieToast = async () => {
      const message = await consumeCookie('toast');
      if (message) {
        toast.success(message);
      }
    };

    showCookieToast();
  }, [pathname]);

  return null;
}
