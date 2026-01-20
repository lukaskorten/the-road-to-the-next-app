import { getComments } from '../queries/get-comments';
import { CommentItem } from './comment-item';

type CommentListProps = {
  ticketId: string;
};

export async function CommentList({ ticketId }: CommentListProps) {
  const comments = await getComments(ticketId);

  return (
    <div className="flex flex-col space-y-2">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
