'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';
import { consumeCookie } from '@/actions/cookies';

export function RedirectToast() {
  useEffect(() => {
    const showCookieToast = async () => {
      const message = await consumeCookie('toast');
      if (message) {
        toast.success(message);
      }
    };

    showCookieToast();
  }, []);

  return null;
}
