'use client';

import { LucideLoaderCircle, LucideTrash } from 'lucide-react';
import { useConfirmDialog } from '@/components/confirm-dialog';
import { Button } from '@/components/ui/button';
import { deleteMembership } from '../actions/delete-membership';

type MembershipDeleteButtonProps = {
  userId: string;
  organizationId: string;
};

export default function MembershipDeleteButton({
  userId,
  organizationId,
}: MembershipDeleteButtonProps) {
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteMembership.bind(null, userId, organizationId),
    trigger: (isPending) => (
      <Button variant="destructive" size="icon">
        {isPending ? (
          <LucideLoaderCircle className="animate-spin" />
        ) : (
          <LucideTrash />
        )}
      </Button>
    ),
  });

  return (
    <>
      {deleteButton}
      {deleteDialog}
    </>
  );
}
