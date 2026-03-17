'use client';

import { useActionState, useState } from 'react';
import zxcvbn, { ZXCVBNResult } from 'zxcvbn';
import { FieldError } from '@/components/form/field-error';
import { Form } from '@/components/form/form';
import { SubmitButton } from '@/components/form/submit-button';
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updatePassword } from '../actions/update-password';
import { PasswordStrength } from './password-strength';

export function PasswordEditForm() {
  const [strength, setStrength] = useState<ZXCVBNResult>();
  const [actionState, action] = useActionState(
    updatePassword,
    EMPTY_ACTION_STATE
  );

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setStrength(zxcvbn(password));
  };

  return (
    <Form action={action} actionState={actionState}>
      <Label htmlFor="currentPassword">Current Password</Label>
      <Input
        id="currentPassword"
        name="currentPassword"
        type="password"
        autoComplete="current-password"
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
        autoComplete="new-password"
        defaultValue={(actionState.payload?.get('newPassword') as string) ?? ''}
        onChange={handlePasswordChange}
      />
      <FieldError actionState={actionState} name="newPassword" />
      {strength && <PasswordStrength strength={strength} />}

      <Label htmlFor="confirmPassword">Confirm Password</Label>
      <Input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        autoComplete="new-password"
      />
      <FieldError actionState={actionState} name="confirmPassword" />

      <SubmitButton label="Update Password" />
    </Form>
  );
}
