'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useQueryState } from 'nuqs';
import { Fragment } from 'react';
import { CardCompact } from '@/components/card-compact';
import { Button } from '@/components/ui/button';
import { editCommentIdParser } from '@/features/ticket/search-params';
import { Paginated } from '@/types/pagination';
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
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ['comments', ticketId],
      queryFn: ({ pageParam }) => getComments(ticketId, pageParam),
      initialPageParam: paginatedComments.metadata.cursor,
      getNextPageParam: (lastPage) =>
        lastPage.metadata.hasNextPage ? lastPage.metadata.cursor : undefined,
      initialData: {
        pages: [
          {
            list: paginatedComments.list,
            metadata: paginatedComments.metadata,
          },
        ],
        pageParams: [],
      },
    });

  const comments = data.pages.flatMap((page) => page.list);

  const handleMore = () => fetchNextPage();
  const handleCommentDeleted = () => refetch();
  const handleUpdated = () => refetch();
  const handleCreated = () => refetch();

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
                          onDeleted={() => handleCommentDeleted()}
                        />,
                        <CommentEditButton key="1" commentId={comment.id} />,
                      ]
                    : []),
                ]}
              />
            )}
          </Fragment>
        ))}
        {hasNextPage && (
          <Button
            onClick={handleMore}
            variant="ghost"
            disabled={isFetchingNextPage}
          >
            More
          </Button>
        )}
      </div>
    </section>
  );
}
