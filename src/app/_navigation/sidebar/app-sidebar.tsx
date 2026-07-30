'use client';

import { LucideHome } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  homePath,
  passwordForgotPath,
  signInPath,
  signUpPath,
} from '@/app/paths';
import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { getActivePath } from '@/utils/get-active-path';
import { NAV_ITEMS } from './constants';
import { NavUser } from './nav-user';

export function AppSidebar() {
  const { user, isFetched } = useAuth();
  const pathname = usePathname();
  const { activeIndex } = getActivePath(
    pathname,
    NAV_ITEMS.map((i) => i.href),
    [signInPath(), signUpPath(), passwordForgotPath()]
  );

  const navItems = user && isFetched ? NAV_ITEMS : NAV_ITEMS.slice(0, 1);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="mt-2">
              <Link href={homePath()}>
                <LucideHome className="text-amber-600" />
                <span className="font-extrabold">
                  <span className=" text-amber-600">Ticket</span>
                  <span>Bounty</span>
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((navItem, index) => (
                <>
                  <SidebarMenuItem key={navItem.title}>
                    {navItem.hasSeparator && <Separator className="my-1" />}
                    <SidebarMenuButton asChild isActive={index === activeIndex}>
                      <Link href={navItem.href}>
                        <navItem.icon />
                        <span>{navItem.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {user && isFetched && <NavUser user={user} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
