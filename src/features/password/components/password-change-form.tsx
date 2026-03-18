'use client';

import { useActionState } from 'react';
import { FieldError } from '@/components/form/field-error';
import { Form } from '@/components/form/form';
import { SubmitButton } from '@/components/form/submit-button';
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { changePassword } from '../actions/change-password';

export function PasswordChangeForm() {
  const [actionState, action] = useActionState(
    changePassword,
    EMPTY_ACTION_STATE
  );

  return (
    <Form action={action} actionState={actionState}>
      <Label htmlFor="password">Current Password</Label>
      <Input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        defaultValue={(actionState.payload?.get('password') as string) ?? ''}
      />
      <FieldError actionState={actionState} name="password" />

      <SubmitButton label="Send Password Reset Email" />
    </Form>
  );
}
