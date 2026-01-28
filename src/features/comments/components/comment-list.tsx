import { getAuth } from '@/features/auth/queries/get-auth';
import { isOwner } from '@/features/auth/utils/is-owner';
import { getComments } from '../queries/get-comments';
import { CommentDeleteButton } from './comment-delete-button';
import { CommentItem } from './comment-item';

type CommentListProps = {
  ticketId: string;
};

export async function CommentList({ ticketId }: CommentListProps) {
  const comments = await getComments(ticketId);
  const { user } = await getAuth();

  return (
    <div className="flex flex-col space-y-2">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          buttons={[
            ...(isOwner(user, comment)
              ? [<CommentDeleteButton key="0" commentId={comment.id} />]
              : []),
          ]}
        />
      ))}
    </div>
  );
}
