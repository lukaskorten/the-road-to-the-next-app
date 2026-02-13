'use client';

import { LucideTrash } from 'lucide-react';
import { useConfirmDialog } from '@/components/confirm-dialog';
import { Button } from '@/components/ui/button';
import { deleteComment } from '../actions/delete-comment';

type CommentDeleteButtonProps = {
  commentId: string;
  onDeleted?: () => void;
};

export function CommentDeleteButton({ commentId, onDeleted }: CommentDeleteButtonProps) {
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteComment.bind(null, commentId),
    trigger: (
      <Button size="icon" variant="outline" aria-label="Delete Comment">
        <LucideTrash />
      </Button>
    ),
    onSuccess: onDeleted,
  });

  return (
    <>
      {deleteButton}
      {deleteDialog}
    </>
  );
}
