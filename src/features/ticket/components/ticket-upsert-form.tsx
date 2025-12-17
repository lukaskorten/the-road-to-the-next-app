'use client';

import { LucideLoader } from 'lucide-react';
import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Ticket } from '@/generated/prisma/client';
import { upsertTicket } from '../actions/upsert-ticket';

type TicketUpsertFormProps = {
  ticket?: Ticket;
};

export function TicketUpsertForm({ ticket }: TicketUpsertFormProps) {
  const [isPending, startTransition] = useTransition();

  const upsertTicketAction = (formData: FormData) => {
    startTransition(async () => {
      await upsertTicket.bind(null, ticket?.id)(formData);
    });
  };

  return (
    <form action={upsertTicketAction} className="flex flex-col gap-y-2">
      <Label htmlFor="title">Title</Label>
      <Input id="text" name="title" type="text" defaultValue={ticket?.title} />

      <Label htmlFor="content">Content</Label>
      <Textarea id="content" name="content" defaultValue={ticket?.content} />

      <Button type="submit">
        {isPending && <LucideLoader className="w-4 h-4 animate-spin" />}
        {ticket ? 'Update' : 'Create'}
      </Button>
    </form>
  );
}
