import { Suspense } from 'react';
import { CardCompact } from '@/components/card-compact';
import { Skeleton } from '@/components/ui/skeleton';
import { Paginated } from '@/utils/pagination';
import { CommentWithMetadata } from '../types';
import { CommentForm } from './comment-form';
import { CommentList } from './comment-list';

type CommentsProps = {
  ticketId: string;
  paginatedComments: Paginated<CommentWithMetadata>;
};

export function Comments({ ticketId, paginatedComments }: CommentsProps) {
  return (
    <section className="mt-16 flex flex-col space-y-4">
      <CardCompact
        title="Comments"
        description="Share your thoughts and feedback on this ticket."
        content={<CommentForm ticketId={ticketId} />}
      />

      <Suspense
        fallback={
          <div className="flex flex-col space-y-2">
            <Skeleton className="h-21.25" />
            <Skeleton className="h-21.25" />
          </div>
        }
      >
        <CommentList
          ticketId={ticketId}
          paginatedComments={paginatedComments}
        />
      </Suspense>
    </section>
  );
}
