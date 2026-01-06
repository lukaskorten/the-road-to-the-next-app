import { LucideBook, LucideContact, LucideLibrary } from 'lucide-react';
import { accountProfilePath, homePath, ticketsPath } from '@/app/paths';
import { NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  {
    title: 'All Tickets',
    icon: LucideLibrary,
    href: homePath(),
  },
  {
    title: 'My Tickets',
    icon: LucideBook,
    href: ticketsPath(),
  },
  {
    title: 'Profile',
    icon: LucideContact,
    href: accountProfilePath(),
    hasSeparator: true,
  },
];

export const CLOSED_CLASS_NAME =
  'text-background opacity-0 transition-all duration-300 group-hover:z-40 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100';
