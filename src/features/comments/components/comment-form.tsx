'use client';

import { useQueryState } from 'nuqs';
import { useActionState } from 'react';
import { FieldError } from '@/components/form/field-error';
import { Form } from '@/components/form/form';
import { SubmitButton } from '@/components/form/submit-button';
import {
  ActionState,
  emptyActionState,
} from '@/components/form/utils/to-action-state';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { editCommentIdParser } from '@/features/ticket/search-params';
import { Comment } from '@/generated/prisma/client';
import { upsertComment } from '../actions/upsert-comment';
import { CommentWithMetadata } from '../types';

type CommentFormProps = {
  ticketId: string;
  comment?: Comment;
  update?: boolean;
  onSuccess?: (comment: CommentWithMetadata) => void;
};

export function CommentForm({
  ticketId,
  comment,
  update = false,
  onSuccess,
}: CommentFormProps) {
  const [, setEditCommentId] = useQueryState(
    'editCommentId',
    editCommentIdParser,
  );
  const [actionState, action] = useActionState(
    upsertComment.bind(null, comment?.id, ticketId),
    emptyActionState<CommentWithMetadata>(),
  );

  const handleSuccess = (actionState: ActionState<CommentWithMetadata>) => {
    if (update) {
      setEditCommentId(null);
    }
    const comment = actionState.data;
    if (comment) {
      onSuccess?.(comment);
    }
  };

  const handleCancel = () => {
    if (update) {
      setEditCommentId(null);
    }
  };

  return (
    <Form action={action} actionState={actionState} onSuccess={handleSuccess}>
      <Label htmlFor="content" className="sr-only">
        Comment
      </Label>
      <Textarea
        id="content"
        name="content"
        placeholder="What are your thoughts?"
        defaultValue={
          (actionState.payload?.get('content') as string) ?? comment?.content
        }
      />
      <FieldError actionState={actionState} name="content" />
      <div className="flex justify-end mt-2">
        <div className="flex gap-x-1">
          <Button variant="outline" onClick={handleCancel} type="reset">
            Cancel
          </Button>
          <SubmitButton label={update ? 'Update' : 'Submit'} />
        </div>
      </div>
    </Form>
  );
}
