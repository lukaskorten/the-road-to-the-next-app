import { Prisma } from '@/generated/prisma/client';

type CommentItemProps = {
  comment: Prisma.CommentGetPayload<{
    include: { user: { select: { username: true } } };
  }>;
};

export function CommentItem({ comment }: CommentItemProps) {
  return (
    <div className="border p-4 rounded-lg flex flex-col gap-2">
      <div className="text-muted-foreground text-sm flex justify-between">
        <span className="font-semibold">{comment.user.username}</span>
        <span>
          {comment.createdAt.toLocaleString('de-DE', {
            dateStyle: 'short',
            timeStyle: 'short',
          })}
        </span>
      </div>
      <div>{comment.content}</div>
    </div>
  );
}
