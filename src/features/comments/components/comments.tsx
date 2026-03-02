'use client';

import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useQueryState } from 'nuqs';
import { Fragment, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { CardCompact } from '@/components/card-compact';
import { editCommentIdParser } from '@/features/ticket/search-params';
import { Paginated } from '@/types/pagination';
import { CommentCursor, getComments } from '../queries/get-comments';
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
  const queryKey = ['comments', ticketId];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam }) => getComments(ticketId, pageParam),
      initialPageParam: undefined as CommentCursor | undefined,
      getNextPageParam: (lastPage) =>
        lastPage.metadata.hasNextPage ? lastPage.metadata.cursor : undefined,
      initialData: {
        pages: [
          {
            list: paginatedComments.list,
            metadata: paginatedComments.metadata,
          },
        ],
        pageParams: [undefined],
      },
    });

  const { ref, inView } = useInView();

  const queryClient = useQueryClient();
  const comments = data.pages.flatMap((page) => page.list);

  const handleCommentDeleted = () =>
    queryClient.invalidateQueries({ queryKey });
  const handleUpdated = () => queryClient.invalidateQueries({ queryKey });
  const handleCreated = () => queryClient.invalidateQueries({ queryKey });

  useEffect(() => {
    if (hasNextPage && inView && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, inView, isFetchingNextPage, fetchNextPage]);

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
        <div ref={ref}>
          {!hasNextPage && (
            <p className="text-sm text-muted italic text-center">
              No more comments.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
