'use client';

import { LucideArrowLeftRight } from 'lucide-react';
import { useActionState } from 'react';
import { Form } from '@/components/form/form';
import { SubmitButton } from '@/components/form/submit-button';
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state';
import { switchOrganization } from '../actions/switch-organization';

type SwitchOrganizationButtonProps = {
  isActive: boolean;
  switchButtonLabel: string;
  organizationId: string;
};

export function SwitchOrganizationButton({
  isActive,
  switchButtonLabel,
  organizationId,
}: SwitchOrganizationButtonProps) {
  const [actionState, action] = useActionState(
    switchOrganization.bind(null, organizationId),
    EMPTY_ACTION_STATE
  );

  return (
    <Form action={action} actionState={actionState}>
      <SubmitButton
        variant={isActive ? 'default' : 'outline'}
        label={switchButtonLabel}
        icon={<LucideArrowLeftRight />}
      />
    </Form>
  );
}
