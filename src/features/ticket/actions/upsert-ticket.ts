'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ticketPath, ticketsPath } from '@/app/paths';
import { prisma } from '@/lib/prisma';

export async function upsertTicket(
  id: string | undefined,
  actionMessage: { message: string },
  formData: FormData
) {
  const data = {
    title: formData.get('title'),
    content: formData.get('content'),
  };

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

  revalidatePath(ticketsPath());

  if (id) {
    redirect(ticketPath(id));
  }

  return { message: 'Ticket created successfully' };
}
