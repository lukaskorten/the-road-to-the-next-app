import { getAuth } from '@/features/auth/queries/get-auth';
import { isOwner } from '@/features/auth/utils/is-owner';
import { searchParamsCache } from '@/features/ticket/search-params';
import { CommentWithMetadata } from '../types';
import { CommentDeleteButton } from './comment-delete-button';
import { CommentEditButton } from './comment-edit-button';
import { CommentForm } from './comment-form';
import { CommentItem } from './comment-item';

type CommentListProps = {
  ticketId: string;
  comments: CommentWithMetadata[];
};

export async function CommentList({ ticketId, comments }: CommentListProps) {
  const { user } = await getAuth();
  const editCommentId = searchParamsCache.get('editCommentId');

  return (
    <div className="flex flex-col space-y-2">
      {comments.map((comment) =>
        editCommentId === comment.id && isOwner(user, comment) ? (
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
              ...(isOwner(user, comment)
                ? [
                    <CommentDeleteButton key="0" commentId={comment.id} />,
                    <CommentEditButton key="1" commentId={comment.id} />,
                  ]
                : []),
            ]}
          />
        ),
      )}
    </div>
  );
}
