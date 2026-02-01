'use client';

import { LucidePen } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { Button } from '@/components/ui/button';
import { editCommentIdParser } from '@/features/ticket/search-params';

type CommentEditButtonProps = {
  commentId: string;
};

export function CommentEditButton({ commentId }: CommentEditButtonProps) {
  const [, setEditCommentId] = useQueryState(
    'editCommentId',
    editCommentIdParser,
  );

  return (
    <Button
      key="1"
      variant="outline"
      size="icon"
      aria-label="Edit comment"
      onClick={() => setEditCommentId(commentId)}
    >
      <LucidePen />
    </Button>
  );
}
