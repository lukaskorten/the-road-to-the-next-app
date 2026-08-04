'use server';

import { redirect } from 'next/navigation';
import z from 'zod';
import { setCookie } from '@/actions/cookies';
import { ticketsPath } from '@/app/paths';
import {
  ActionState,
  fromErrorToActionState,
} from '@/components/form/utils/to-action-state';
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';
import { prisma } from '@/lib/prisma';

const createOrganizationSchema = z.object({
  name: z.string().min(1).max(191),
});

export async function createOrganization(
  _actionState: ActionState,
  formData: FormData
) {
  const { user } = await getAuthOrRedirect({ checkOrganizations: false });

  try {
    const data = createOrganizationSchema.parse(
      Object.fromEntries(formData.entries())
    );

    await prisma.organization.create({
      data: {
        ...data,
        memberships: {
          create: {
            userId: user.id,
          },
        },
      },
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  await setCookie('toast', 'Organization created!');
  redirect(ticketsPath());
}
