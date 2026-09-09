import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getMemberships } from '../queries/get-memberships';

type MembershipsListProps = {
  organizationId: string;
};

export default async function MembershipsList({
  organizationId,
}: MembershipsListProps) {
  const memberships = await getMemberships(organizationId);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Joined At</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {memberships.map((membership) => {
          const buttons = <></>;

          return (
            <TableRow key={membership.userId}>
              <TableCell>{membership.user.firstName}</TableCell>
              <TableCell>{membership.user.lastName}</TableCell>
              <TableCell>
                {format(membership.joinedAt, 'dd.MM.yyyy HH:mm')}
              </TableCell>
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
