'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';
import { deleteCookie, getCookie } from '@/actions/cookies';

export function RedirectToast() {
  useEffect(() => {
    const showCookieToast = async () => {
      const message = await getCookie('toast');
      if (message) {
        toast.success(message);
        await deleteCookie('toast');
      }
    };

    showCookieToast();
  }, []);

  return null;
}
