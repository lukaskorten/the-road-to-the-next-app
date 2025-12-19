'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { setCookie } from '@/actions/cookies';
import { ticketPath, ticketsPath } from '@/app/paths';
import {
  ActionState,
  fromErrorToActionState,
  toSuccessActionState,
} from '@/components/form/utils/to-action-state';
import { prisma } from '@/lib/prisma';

const upsertTicketSchema = z.object({
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(1024),
});

export async function upsertTicket(
  id: string | undefined,
  _actionState: ActionState,
  formData: FormData
) {
  try {
    const { title, content } = upsertTicketSchema.parse({
      title: formData.get('title'),
      content: formData.get('content'),
    });

    await prisma.ticket.upsert({
      where: { id: id ?? '' },
      update: { title, content },
      create: { title, content },
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  revalidatePath(ticketsPath());

  if (id) {
    setCookie('toast', 'Ticket created');
    redirect(ticketPath(id));
  }

  return toSuccessActionState('Ticket created');
}
