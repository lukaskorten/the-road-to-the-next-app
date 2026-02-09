'use client';

import { useQueryState } from 'nuqs';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { editCommentIdParser } from '@/features/ticket/search-params';
import { Paginated } from '@/utils/pagination';
import { getComments } from '../queries/get-comments';
import { CommentWithMetadata } from '../types';
import { CommentDeleteButton } from './comment-delete-button';
import { CommentEditButton } from './comment-edit-button';
import { CommentForm } from './comment-form';
import { CommentItem } from './comment-item';

type CommentListProps = {
  ticketId: string;
  paginatedComments: Paginated<CommentWithMetadata>;
};

export function CommentList({ ticketId, paginatedComments }: CommentListProps) {
  const [editCommentId] = useQueryState('editCommentId', editCommentIdParser);
  const [comments, setComments] = useState(paginatedComments.list);
  const [metadata, setMetadata] = useState(paginatedComments.metadata);

  const handleMore = async () => {
    const { list, metadata } = await getComments(ticketId, comments.length);
    setComments((prevComments) => [...prevComments, ...list]);
    setMetadata(metadata);
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
      {metadata.hasNextPage && (
        <Button onClick={handleMore} variant="ghost">
          More
        </Button>
      )}
    </div>
  );
}
