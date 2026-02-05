'use client';

import { useQueryState } from 'nuqs';
import { Button } from '@/components/ui/button';
import { editCommentIdParser } from '@/features/ticket/search-params';
import { CommentWithMetadata } from '../types';
import { CommentDeleteButton } from './comment-delete-button';
import { CommentEditButton } from './comment-edit-button';
import { CommentForm } from './comment-form';
import { CommentItem } from './comment-item';

type CommentListProps = {
  ticketId: string;
  comments: CommentWithMetadata[];
};

export function CommentList({ ticketId, comments }: CommentListProps) {
  const [editCommentId] = useQueryState('editCommentId', editCommentIdParser);

  const handleMore = () => {
    console.log('more');
  };

  return (
    <div className="flex flex-col space-y-2">
      {comments.map((comment) =>
        editCommentId === comment.id && comment.isOwner ? (
          <CommentForm
            key={comment.id}
            comment={comment}
            ticketId={ticketId}
            update
          />
        ) : (
          <CommentItem
            key={comment.id}
            comment={comment}
            buttons={[
              ...(comment.isOwner
                ? [
                    <CommentDeleteButton key="0" commentId={comment.id} />,
                    <CommentEditButton key="1" commentId={comment.id} />,
                  ]
                : []),
            ]}
          />
        ),
      )}

      <Button onClick={handleMore} variant="ghost">
        More
      </Button>
    </div>
  );
}
