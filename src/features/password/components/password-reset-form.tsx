'use client';

import { useActionState, useState } from 'react';
import zxcvbn, { ZXCVBNResult } from 'zxcvbn';
import { FieldError } from '@/components/form/field-error';
import { Form } from '@/components/form/form';
import { SubmitButton } from '@/components/form/submit-button';
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { resetPassword } from '../actions/reset-password';
import { PasswordStrength } from './password-strength';

type PasswordResetFormProps = {
  token: string;
};

export function PasswordResetForm({ token }: PasswordResetFormProps) {
  const [strength, setStrength] = useState<ZXCVBNResult>();
  const [actionState, action] = useActionState(
    resetPassword.bind(null, token),
    EMPTY_ACTION_STATE
  );

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setStrength(zxcvbn(password));
  };

  return (
    <Form action={action} actionState={actionState}>
      <Label htmlFor="password">Password</Label>
      <Input
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        defaultValue={actionState.payload?.get('password') as string}
        onChange={handlePasswordChange}
      />
      <FieldError actionState={actionState} name="password" />
      {strength && <PasswordStrength strength={strength} />}

      <Label htmlFor="confirmPassword">Confirm Password</Label>
      <Input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        defaultValue={actionState.payload?.get('confirmPassword') as string}
      />
      <FieldError actionState={actionState} name="confirmPassword" />

      <SubmitButton label="Reset Password" />
    </Form>
  );
}
