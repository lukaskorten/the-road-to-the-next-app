import {
  LucideChevronUp,
  LucideLock,
  LucideLogOut,
  LucideUser,
} from 'lucide-react';
import Link from 'next/link';
import { accountPasswordPath, accountProfilePath } from '@/app/paths';
import { signOut } from '@/features/auth/actions/sign-out';
import { User } from '@/generated/prisma/client';
import { SubmitButton } from './form/submit-button';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { SidebarMenuButton } from './ui/sidebar';

type AccountDropdownProps = {
  user: User;
};

export function AccountDropdown({ user }: AccountDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton>
          <Avatar>
            <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>{' '}
          </Avatar>
          {user.username}
          <LucideChevronUp className="ml-auto" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem asChild>
          <Link href={accountProfilePath()}>
            <LucideUser />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={accountPasswordPath()}>
            <LucideLock />
            Password
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <form action={signOut}>
          <SubmitButton
            label="Sign Out"
            icon={<LucideLogOut />}
            iconPosition="left"
            variant="ghost"
          />
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
