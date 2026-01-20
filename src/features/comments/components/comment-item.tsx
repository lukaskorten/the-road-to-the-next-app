import { Prisma } from '@/generated/prisma/client';

type CommentItemProps = {
  comment: Prisma.CommentGetPayload<{
    include: { user: { select: { username: true } } };
  }>;
};

export function CommentItem({ comment }: CommentItemProps) {
  return <div>{comment.content}</div>;
}
