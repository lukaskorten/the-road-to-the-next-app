'use client';

import { useActionState } from 'react';
import { DatePicker } from '@/components/date-picker';
import { FieldError } from '@/components/form/field-error';
import { Form } from '@/components/form/form';
import { SubmitButton } from '@/components/form/submit-button';
import {
  ActionState,
  EMPTY_ACTION_STATE,
} from '@/components/form/utils/to-action-state';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Ticket } from '@/generated/prisma/client';
import { fromCent } from '@/utils/currency';
import { upsertTicket } from '../actions/upsert-ticket';

type TicketUpsertFormProps = {
  ticket?: Ticket;
};

export function TicketUpsertForm({ ticket }: TicketUpsertFormProps) {
  const [actionState, action] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_ACTION_STATE
  );

  const handleSuccess = (actionState: ActionState) => {
    // TODO: reset the date-picker

    console.log('success');
  };

  return (
    <Form action={action} actionState={actionState} onSuccess={handleSuccess}>
      <Label htmlFor="title">Title</Label>
      <Input
        id="text"
        name="title"
        type="text"
        defaultValue={
          (actionState.payload?.get('title') as string) ?? ticket?.title
        }
      />
      <FieldError actionState={actionState} name="title" />

      <Label htmlFor="content">Content</Label>
      <Textarea
        id="content"
        name="content"
        defaultValue={
          (actionState.payload?.get('content') as string) ?? ticket?.content
        }
      />
      <FieldError actionState={actionState} name="content" />
      <div className="flex gap-x-2 mb-2">
        <div className="flex flex-col gap-y-2 w-1/2">
          <Label htmlFor="deadline">Deadline</Label>
          <DatePicker
            id="text"
            name="deadline"
            defaultValue={
              (actionState.payload?.get('deadline') as string) ??
              ticket?.deadline
            }
          />
          <FieldError actionState={actionState} name="deadline" />
        </div>
        <div className="flex flex-col gap-y-2 w-1/2">
          <Label htmlFor="bounty">Bounty</Label>
          <Input
            id="text"
            name="bounty"
            type="number"
            step=".01"
            defaultValue={
              (actionState.payload?.get('bounty') as string) ??
              (ticket?.bounty ? fromCent(ticket.bounty) : '')
            }
          />
          <FieldError actionState={actionState} name="bounty" />
        </div>
      </div>

      <SubmitButton label={ticket ? 'update' : 'create'} />
    </Form>
  );
}
