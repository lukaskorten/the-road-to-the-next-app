'use client';

import { useState } from 'react';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { cn } from '@/lib/utils';
import { NAV_ITEMS } from '../constants';
import { SidebarItem } from './siderbar-item';

export function Sidebar() {
  const { user, isFetched } = useAuth();
  const [isTransition, setIsTransition] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (open: boolean) => {
    setIsTransition(true);
    setIsOpen(open);
    setTimeout(() => setIsTransition(false), 200);
  };

  if (!isFetched || !user) {
    return <div className="w-17"></div>;
  }

  return (
    <nav
      className={cn(
        'animate-sidebar-from-left',
        'h-screen border-r pt-24',
        isTransition && 'duration-200',
        isOpen ? 'md:w-60 w-17' : 'w-17'
      )}
      onMouseEnter={() => handleToggle(true)}
      onMouseLeave={() => handleToggle(false)}
    >
      <div className="px-3 py-2">
        <nav className="space-y-2">
          {NAV_ITEMS.map((navItem) => (
            <SidebarItem
              key={navItem.title}
              navItem={navItem}
              isOpen={isOpen}
            />
          ))}
        </nav>
      </div>
    </nav>
  );
}
