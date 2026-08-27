import { format } from 'date-fns';
import { LucideEdit2, LucideSquareArrowOutUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getOrganizationsByUser } from '../queries/get-organizations-by-user';
import { DeleteOrganizationButton } from './delete-organization-button';
import { SwitchOrganizationButton } from './switch-organization-button';

type OrganizationListProps = {
  limitedAccess?: boolean;
};

export default async function OrganizationList({
  limitedAccess,
}: OrganizationListProps) {
  const organizations = await getOrganizationsByUser();
  const hasActive = organizations.some((org) => org.membershipByUser.isActive);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Joined At</TableHead>
          <TableHead>Members</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {organizations.map((organization) => {
          const isActive = organization.membershipByUser.isActive;
          const switchButtonLabel = hasActive
            ? isActive
              ? 'Active'
              : 'Switch'
            : 'Activate';

          const switchButton = (
            <SwitchOrganizationButton
              isActive={isActive}
              switchButtonLabel={switchButtonLabel}
              organizationId={organization.id}
            />
          );

          const detailButton = (
            <Button variant="outline" size="icon" title="Show Details">
              <LucideSquareArrowOutUpRight />
            </Button>
          );

          const editButton = (
            <Button variant="outline" size="icon" title="Edit Organization">
              <LucideEdit2 />
            </Button>
          );

          const deleteButton = (
            <DeleteOrganizationButton organizationId={organization.id} />
          );

          const buttons = (
            <>
              {switchButton}
              {limitedAccess ? null : detailButton}
              {limitedAccess ? null : editButton}
              {limitedAccess ? null : deleteButton}
            </>
          );

          return (
            <TableRow key={organization.id}>
              <TableCell>{organization.id}</TableCell>
              <TableCell>{organization.name}</TableCell>
              <TableCell>
                {format(
                  organization.membershipByUser.joinedAt,
                  'dd.MM.yyyy HH:mm'
                )}
              </TableCell>
              <TableCell>{organization.membersCount}</TableCell>
              <TableCell className="flex justify-end gap-x-2">
                {buttons}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
