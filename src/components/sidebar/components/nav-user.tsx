import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import {
  LucideChevronsUpDown,
  LucideLock,
  LucideLogOut,
  LucideUser,
} from 'lucide-react';
import Link from 'next/link';
import { accountPasswordPath, accountProfilePath } from '@/app/paths';
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { signOut } from '@/features/auth/actions/sign-out';
import { User } from '@/generated/prisma/client';

export function NavUser({ user }: { user: User }) {
  const { isMobile } = useSidebar();

  const userLabel = (
    <>
      <Avatar className="flex items-center justify-center bg-muted h-8 w-8 rounded-lg shrink-0">
        {user.avatarUrl && (
          <AvatarImage
            className="rounded-lg"
            src={user.avatarUrl}
            alt={user.username}
          />
        )}
        <AvatarFallback className="font-semibold">
          {user.username[0].toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{user.username}</span>
        <span className="truncate text-xs">{user.email}</span>
      </div>
    </>
  );

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {userLabel}
              <LucideChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                {userLabel}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
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
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <form action={signOut}>
              <DropdownMenuItem asChild>
                <SidebarMenuButton>
                  <LucideLogOut />
                  Sign Out
                </SidebarMenuButton>
              </DropdownMenuItem>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
