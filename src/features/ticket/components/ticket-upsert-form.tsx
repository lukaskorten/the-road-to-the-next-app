'use client';

import { useActionState } from 'react';
import { FieldError } from '@/components/form/field-error';
import { SubmitButton } from '@/components/form/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Ticket } from '@/generated/prisma/client';
import { upsertTicket } from '../actions/upsert-ticket';

type TicketUpsertFormProps = {
  ticket?: Ticket;
};

export function TicketUpsertForm({ ticket }: TicketUpsertFormProps) {
  const [actionState, action] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    { message: '', fieldErrors: {} }
  );

  return (
    <form action={action} className="flex flex-col gap-y-2">
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

      <SubmitButton label={ticket ? 'update' : 'create'} />

      <p>{actionState.message}</p>
    </form>
  );
}
