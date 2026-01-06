'use client';

import { Separator } from '@radix-ui/react-separator';
import Link from 'next/link';
import { signInPath, signUpPath } from '@/app/paths';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { ThemeSwitcher } from './theme/theme-switcher';
import { buttonVariants } from './ui/button';
import { SidebarTrigger } from './ui/sidebar';

const navItems = (
  <>
    <Link
      href={signUpPath()}
      className={buttonVariants({ variant: 'outline' })}
    >
      Sign Up
    </Link>
    <Link
      href={signInPath()}
      className={buttonVariants({ variant: 'default' })}
    >
      Sign In
    </Link>
  </>
);

export function AppHeader() {
  const { user } = useAuth();

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger />
      <Separator orientation="vertical" className="mr-2 h-4" />

      <div className="flex flex-1 justify-end items-center gap-x-2">
        {!user && navItems}
        <ThemeSwitcher />
      </div>
    </header>
  );
}
