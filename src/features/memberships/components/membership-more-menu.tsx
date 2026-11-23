'use client';

import { LucideUserCog } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MembershipRole } from '@/generated/prisma/enums';
import { updateMembershipRole } from '../actions/update-membership-role';

type MembershipMoreMenuProps = {
  userId: string;
  organizationId: string;
  membershipRole: MembershipRole;
};

export default function MembershipMoreMenu({
  userId,
  organizationId,
  membershipRole,
}: MembershipMoreMenuProps) {
  const onMembershipRoleChange = async (value: string) => {
    const promise = updateMembershipRole({
      userId,
      organizationId,
      newRole: value as MembershipRole,
    });

    toast.promise(promise, { loading: 'Updating membership role...' });

    const result = await promise;
    if (result.status === 'SUCCESS') {
      toast.info(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <LucideUserCog />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Roles</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={membershipRole}
          onValueChange={onMembershipRoleChange}
        >
          <DropdownMenuRadioItem value={MembershipRole.ADMIN}>
            Admin
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={MembershipRole.MEMBER}>
            Member
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
