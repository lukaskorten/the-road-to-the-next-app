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
import { getMemberships } from '../queries/get-memberships';
import MembershipDeleteButton from './membership-delete-button';

type MembershipsListProps = {
  organizationId: string;
};

export default async function MembershipsList({
  organizationId,
}: MembershipsListProps) {
  const { memberships, currentUserId } = await getMemberships(organizationId);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Username</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Joined At</TableHead>
          <TableHead>Verified Email</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {memberships.map((membership) => {
          const deleteButton = (
            <MembershipDeleteButton
              userId={membership.userId}
              organizationId={membership.organizationId}
            />
          );
          const buttons = <>{deleteButton}</>;
          const isCurrentUser = membership.userId === currentUserId;

          return (
            <TableRow key={membership.userId}>
              <TableCell>
                {membership.user.username}
                {isCurrentUser && (
                  <span className="text-muted-foreground text-xs"> (you)</span>
                )}
              </TableCell>
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
