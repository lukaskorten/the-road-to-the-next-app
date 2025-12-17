'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { ticketPath, ticketsPath } from '@/app/paths';
import { prisma } from '@/lib/prisma';

const upsertTicketSchema = z.object({
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(1024),
});

export async function upsertTicket(
  id: string | undefined,
  _actionState: { message: string; payload?: FormData },
  formData: FormData
) {
  try {
    const data = upsertTicketSchema.parse({
      title: formData.get('title'),
      content: formData.get('content'),
    });

    await prisma.ticket.upsert({
      where: { id: id ?? '' },
      update: {
        title: data.title as string,
        content: data.content as string,
      },
      create: {
        title: data.title as string,
        content: data.content as string,
      },
    });
  } catch {
    return { message: 'Something went wrong', payload: formData };
  }

  revalidatePath(ticketsPath());

  if (id) {
    redirect(ticketPath(id));
  }

  return { message: 'Ticket created successfully' };
}
