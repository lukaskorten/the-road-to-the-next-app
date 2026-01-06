'use client';

import { useActionState } from 'react';
import { FieldError } from '@/components/form/field-error';
import { Form } from '@/components/form/form';
import { SubmitButton } from '@/components/form/submit-button';
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updatePassword } from '../actions/update-password';

export function PasswordEditForm() {
  const [actionState, action] = useActionState(
    updatePassword,
    EMPTY_ACTION_STATE
  );

  return (
    <Form action={action} actionState={actionState}>
      <Label htmlFor="currentPassword">Current Password</Label>
      <Input
        id="currentPassword"
        name="currentPassword"
        type="password"
        defaultValue={
          (actionState.payload?.get('currentPassword') as string) ?? ''
        }
      />
      <FieldError actionState={actionState} name="currentPassword" />

      <Label htmlFor="newPassword">New Password</Label>
      <Input
        id="newPassword"
        name="newPassword"
        type="password"
        defaultValue={(actionState.payload?.get('newPassword') as string) ?? ''}
      />
      <FieldError actionState={actionState} name="newPassword" />

      <Label htmlFor="confirmPassword">Confirm Password</Label>
      <Input id="confirmPassword" name="confirmPassword" type="password" />
      <FieldError actionState={actionState} name="confirmPassword" />

      <SubmitButton label="Update Password" />
    </Form>
  );
}
