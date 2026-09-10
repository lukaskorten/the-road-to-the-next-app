import { format } from 'date-fns';
import { LucideBan, LucideCheck } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Membership, User } from '@/generated/prisma/client';
import { getMemberships } from '../queries/get-memberships';

type MembershipsListProps = {
  organizationId: string;
};

function getName(membership: Membership & { user: User }) {
  const { firstName, lastName, username } = membership.user;
  return firstName && lastName ? `${firstName} ${lastName}` : username;
}

export default async function MembershipsList({
  organizationId,
}: MembershipsListProps) {
  const memberships = await getMemberships(organizationId);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Joined At</TableHead>
          <TableHead>Verified Email</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {memberships.map((membership) => {
          const buttons = <></>;

          return (
            <TableRow key={membership.userId}>
              <TableCell>{getName(membership)}</TableCell>
              <TableCell>{membership.user.email}</TableCell>
              <TableCell>
                {format(membership.joinedAt, 'dd.MM.yyyy HH:mm')}
              </TableCell>
              <TableCell>
                {membership.user.emailVerified ? (
                  <LucideCheck />
                ) : (
                  <LucideBan />
                )}
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
