'use client';

import { LucideTrash2 } from 'lucide-react';
import { useActionState } from 'react';
import { Form } from '@/components/form/form';
import { SubmitButton } from '@/components/form/submit-button';
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state';
import { deleteOrganization } from '../actions/delete-organization';

type DeleteOrganizationButtonProps = {
  organizationId: string;
};

export function DeleteOrganizationButton({
  organizationId,
}: DeleteOrganizationButtonProps) {
  const [actionState, action] = useActionState(
    deleteOrganization.bind(null, organizationId),
    EMPTY_ACTION_STATE
  );

  return (
    <Form action={action} actionState={actionState}>
      <SubmitButton
        variant="destructive"
        label="Delete Organization"
        icon={<LucideTrash2 />}
      />
    </Form>
  );
}
