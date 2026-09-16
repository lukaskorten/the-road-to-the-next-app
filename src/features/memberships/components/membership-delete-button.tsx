'use client';

import { LucideLoaderCircle, LucideLogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useConfirmDialog } from '@/components/confirm-dialog';
import { Button } from '@/components/ui/button';
import { deleteMembership } from '../actions/delete-membership';

type MembershipDeleteButtonProps = {
  userId: string;
  currentUserId: string;
  organizationId: string;
};

export default function MembershipDeleteButton({
  userId,
  currentUserId,
  organizationId,
}: MembershipDeleteButtonProps) {
  const router = useRouter();
  // todo: show different messages based on whether the user is leaving or an admin is deleting a membership
  const isLeaving = userId === currentUserId;
  const [deleteButton, deleteDialog] = useConfirmDialog({
    loadingMessage: isLeaving
      ? 'Leaving organization...'
      : 'Deleting membership...',
    action: deleteMembership.bind(null, userId, organizationId),
    trigger: (isPending) => (
      <Button variant="destructive" size="icon">
        {isPending ? (
          <LucideLoaderCircle className="animate-spin" />
        ) : (
          <LucideLogOut />
        )}
      </Button>
    ),
    onSuccess: () => router.refresh(),
  });

  return (
    <>
      {deleteButton}
      {deleteDialog}
    </>
  );
}
