import { format } from 'date-fns';
import {
  LucideArrowLeftRight,
  LucideEdit2,
  LucideSquareArrowOutUpRight,
  LucideTrash2,
} from 'lucide-react';
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

export default async function OrganizationList() {
  const organizations = await getOrganizationsByUser();

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
          const switchButton = (
            <Button variant="outline" size="icon" title="Change Organization">
              <LucideArrowLeftRight />
            </Button>
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
            <Button
              variant="destructive"
              title="Delete Organization"
              size="icon"
            >
              <LucideTrash2 />
            </Button>
          );

          const buttons = (
            <>
              {switchButton}
              {detailButton}
              {editButton}
              {deleteButton}
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
