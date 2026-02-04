import { format } from 'date-fns';
import { Card } from '@/components/ui/card';
import { CommentWithMetadata } from '../types';

type CommentItemProps = {
  comment: CommentWithMetadata;
  buttons: React.ReactNode[];
};

export function CommentItem({ comment, buttons }: CommentItemProps) {
  return (
    <div className="flex gap-x-2">
      <Card className="flex-1 p-4 flex flex-col gap-2">
        <div className="text-muted-foreground text-sm flex justify-between">
          <span className="font-semibold">{comment.user.username}</span>
          <span>{format(comment.createdAt, 'dd.MM.yyyy, HH:mm')}</span>
        </div>
        <p className="whitespace-pre-line">{comment.content}</p>
      </Card>
      <div className="flex flex-col gap-y-1">{buttons}</div>
    </div>
  );
}
