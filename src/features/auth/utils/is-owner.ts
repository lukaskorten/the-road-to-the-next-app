import { User } from '@/generated/prisma/client';

type Entity = {
  userId: string | null;
};

export function isOwner(
  authUser: User | undefined | null,
  entity: Entity | undefined | null
) {
  if (!authUser || !entity) {
    return null;
  }

  if (!entity.userId) {
    return false;
  }

  return authUser.id === entity.userId;
}
