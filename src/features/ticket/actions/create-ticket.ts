'use server';

import { revalidatePath } from 'next/cache';
import { ticketsPath } from '@/app/paths';
import { prisma } from '@/lib/prisma';

export async function createTicket(formData: FormData) {
  const data = {
    title: formData.get('title'),
    content: formData.get('content'),
  };

  await prisma.ticket.create({
    data: {
      title: data.title as string,
      content: data.content as string,
    },
  });

  revalidatePath(ticketsPath());
}
