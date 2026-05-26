'use client';

import { useActionState } from 'react';
import { FieldError } from '@/components/form/field-error';
import { Form } from '@/components/form/form';
import { SubmitButton } from '@/components/form/submit-button';
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from '@/generated/prisma/client';
import { updateProfile } from '../actions/update-profile';

type EmailEditFormProps = {
  user: User;
};

export function EmailEditForm({ user }: EmailEditFormProps) {
  const [actionState, action] = useActionState(
    updateProfile,
    EMPTY_ACTION_STATE
  );

  return (
    <Form action={action} actionState={actionState}>
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        name="email"
        type="email"
        defaultValue={
          (actionState.payload?.get('email') as string) ?? user.email
        }
      />
      <FieldError actionState={actionState} name="email" />

      <SubmitButton label="Update Email" />
    </Form>
  );
}
