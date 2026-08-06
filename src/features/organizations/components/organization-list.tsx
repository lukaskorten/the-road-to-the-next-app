import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { format } from 'date-fns';
import { LucideMoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
        {organizations.map((organization) => (
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
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-8">
                    <LucideMoreHorizontal />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Change Organization</DropdownMenuItem>
                  <DropdownMenuItem>Show Details</DropdownMenuItem>
                  <DropdownMenuItem>Edit Organization</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    Delete Organization
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
