'use client';

import { useActionState } from 'react';
import { FieldError } from '@/components/form/field-error';
import { Form } from '@/components/form/form';
import { SubmitButton } from '@/components/form/submit-button';
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Comment } from '@/generated/prisma/client';
import { upsertComment } from '../actions/upsert-comment';

type CommentFormProps = {
  ticketId: string;
  comment?: Comment;
};

export function CommentForm({ ticketId, comment }: CommentFormProps) {
  const [actionState, action] = useActionState(
    upsertComment.bind(null, comment?.id, ticketId),
    EMPTY_ACTION_STATE,
  );

  return (
    <Form action={action} actionState={actionState}>
      <Label htmlFor="content" className="sr-only">
        Comment
      </Label>
      <Textarea
        id="content"
        name="content"
        placeholder="Add a comment"
        defaultValue={
          (actionState.payload?.get('content') as string) ?? comment?.content
        }
      />
      <FieldError actionState={actionState} name="content" />
      <div className="flex justify-end mt-2">
        <SubmitButton label="Submit" variant="outline" />
      </div>
    </Form>
  );
}
