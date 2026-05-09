'use client';

import { useActionState } from 'react';
import { FieldError } from '@/components/form/field-error';
import { Form } from '@/components/form/form';
import { SubmitButton } from '@/components/form/submit-button';
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { verifyEmail } from '../actions/verify-email';

export function EmailVerificationForm() {
  const [actionState, action] = useActionState(verifyEmail, EMPTY_ACTION_STATE);

  return (
    <Form action={action} actionState={actionState}>
      <Label htmlFor="code">Verification Code</Label>
      <Input
        id="code"
        name="code"
        type="text"
        placeholder="Enter your verification code"
        defaultValue={actionState.payload?.get('code') as string}
      />
      <FieldError actionState={actionState} name="code" />

      <SubmitButton label="Verify Email" />
    </Form>
  );
}
