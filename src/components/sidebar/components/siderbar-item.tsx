import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { CLOSED_CLASS_NAME } from '../constants';
import { NavItem } from '../types';

type SidebarItemProps = {
  navItem: NavItem;
  isOpen: boolean;
  isActive: boolean;
};

export function SidebarItem({ navItem, isOpen, isActive }: SidebarItemProps) {
  return (
    <>
      {navItem.hasSeparator && <Separator />}
      <Link
        href={navItem.href}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'group relative flex h-12 justify-start',
          isActive && 'bg-muted font-bold hover:bg-muted'
        )}
      >
        {navItem.icon}
        <span
          className={cn(
            'absolute left-12 text-base duration-200',
            isOpen ? 'md:block hidden' : 'w-17',
            !isOpen && CLOSED_CLASS_NAME
          )}
        >
          {navItem.title}
        </span>
      </Link>
    </>
  );
}
