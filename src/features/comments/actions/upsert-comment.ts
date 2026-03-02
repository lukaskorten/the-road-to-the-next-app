'use server';

import { revalidatePath } from 'next/cache';
import z from 'zod';
import { ticketPath } from '@/app/paths';
import {
  ActionState,
  fromErrorToActionState,
  toErrorActionState,
  toSuccessActionState,
} from '@/components/form/utils/to-action-state';
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';
import { prisma } from '@/lib/prisma';
import { CommentWithMetadata } from '../types';

const upsertCommentSchema = z.object({
  content: z.string().min(1).max(1024),
});

export async function upsertComment(
  commentId: string | undefined,
  ticketId: string,
  _actionState: ActionState<CommentWithMetadata>,
  formData: FormData,
): Promise<ActionState<CommentWithMetadata>> {
  const { user } = await getAuthOrRedirect();

  let upsertedComment: CommentWithMetadata;

  try {
    if (commentId) {
      const comment = await prisma.comment.findUnique({
        where: { id: commentId },
      });
      if (!comment || comment.userId !== user.id) {
        return toErrorActionState('Not authorized');
      }
    }

    const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });
    if (!ticket) {
      return toErrorActionState('Ticket not found');
    }

    const data = upsertCommentSchema.parse({
      content: formData.get('content'),
    });

    const dbData = {
      ...data,
      userId: user.id,
      ticketId: ticket.id,
    };

    const dbComment = await prisma.comment.upsert({
      where: { id: commentId ?? '' },
      update: dbData,
      create: dbData,
      include: { user: { select: { username: true } } },
    });
    upsertedComment = { ...dbComment, isOwner: true };
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  revalidatePath(ticketPath(ticketId));

  const message = commentId
    ? 'Comment updated successfully'
    : 'Comment created successfully';

  return toSuccessActionState(message, upsertedComment);
}
