'use client';

import { useQueryState } from 'nuqs';
import { Fragment, useState } from 'react';
import { CardCompact } from '@/components/card-compact';
import { Button } from '@/components/ui/button';
import { editCommentIdParser } from '@/features/ticket/search-params';
import { Paginated } from '@/utils/pagination';
import { getComments } from '../queries/get-comments';
import { CommentWithMetadata } from '../types';
import { CommentDeleteButton } from './comment-delete-button';
import { CommentEditButton } from './comment-edit-button';
import { CommentForm } from './comment-form';
import { CommentItem } from './comment-item';

type CommentsProps = {
  ticketId: string;
  paginatedComments: Paginated<CommentWithMetadata>;
};

export function Comments({ ticketId, paginatedComments }: CommentsProps) {
  const [editCommentId] = useQueryState('editCommentId', editCommentIdParser);
  const [comments, setComments] = useState(paginatedComments.list);
  const [metadata, setMetadata] = useState(paginatedComments.metadata);

  const handleMore = async () => {
    const { list, metadata } = await getComments(ticketId, comments.length);
    setComments((prevComments) => [...prevComments, ...list]);
    setMetadata(metadata);
  };

  const handleCommentDeleted = (commentId: string) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId),
    );
  };

  const handleUpdated = (comment: CommentWithMetadata) => {
    setComments((prevComments) =>
      prevComments.map((c) => (c.id === comment.id ? comment : c)),
    );
  };

  const handleCreated = (comment: CommentWithMetadata) => {
    setComments((prevComments) => [comment, ...prevComments]);
  };

  return (
    <section className="mt-16 flex flex-col space-y-4">
      <CardCompact
        title="Comments"
        description="Share your thoughts and feedback on this ticket."
        content={<CommentForm ticketId={ticketId} onSuccess={handleCreated} />}
      />

      <div className="flex flex-col space-y-2">
        {comments.map((comment) => (
          <Fragment key={comment.id}>
            {editCommentId === comment.id && comment.isOwner ? (
              <CommentForm
                comment={comment}
                ticketId={ticketId}
                update
                onSuccess={handleUpdated}
              />
            ) : (
              <CommentItem
                comment={comment}
                buttons={[
                  ...(comment.isOwner
                    ? [
                        <CommentDeleteButton
                          key="0"
                          commentId={comment.id}
                          onDeleted={() => handleCommentDeleted(comment.id)}
                        />,
                        <CommentEditButton key="1" commentId={comment.id} />,
                      ]
                    : []),
                ]}
              />
            )}
          </Fragment>
        ))}
        {metadata.hasNextPage && (
          <Button onClick={handleMore} variant="ghost">
            More
          </Button>
        )}
      </div>
    </section>
  );
}
