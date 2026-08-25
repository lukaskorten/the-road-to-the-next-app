'use client';

import { LucideLoaderCircle, LucideTrash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useConfirmDialog } from '@/components/confirm-dialog';
import { Button } from '@/components/ui/button';
import { deleteOrganization } from '../actions/delete-organization';

type DeleteOrganizationButtonProps = {
  organizationId: string;
};

export function DeleteOrganizationButton({
  organizationId,
}: DeleteOrganizationButtonProps) {
  const router = useRouter();
  const [button, dialog] = useConfirmDialog({
    action: deleteOrganization.bind(null, organizationId),
    trigger: (isPending) => (
      <Button size="icon" variant="destructive">
        {isPending ? <LucideLoaderCircle /> : <LucideTrash2 />}
      </Button>
    ),
    onSuccess: () => router.refresh(),
  });

  return (
    <>
      {button}
      {dialog}
    </>
  );
}
