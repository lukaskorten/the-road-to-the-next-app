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

type ProfileEditFormProps = {
  user: User;
};

export function ProfileEditForm({ user }: ProfileEditFormProps) {
  const [actionState, action] = useActionState(
    updateProfile,
    EMPTY_ACTION_STATE
  );

  return (
    <Form action={action} actionState={actionState}>
      <Label htmlFor="username">Username</Label>
      <Input
        id="username"
        name="username"
        type="text"
        defaultValue={
          (actionState.payload?.get('username') as string) ?? user.username
        }
      />
      <FieldError actionState={actionState} name="username" />

      <Label htmlFor="avatarUrl">Avatar URL</Label>
      <Input
        id="avatarUrl"
        name="avatarUrl"
        type="url"
        defaultValue={
          (actionState.payload?.get('avatarUrl') as string) ?? user.avatarUrl
        }
      />
      <FieldError actionState={actionState} name="username" />

      <Label htmlFor="firstName">First Name</Label>
      <Input
        id="firstName"
        name="firstName"
        type="text"
        defaultValue={
          (actionState.payload?.get('firstName') as string) ?? user.firstName
        }
      />
      <FieldError actionState={actionState} name="firstName" />

      <Label htmlFor="lastName">Last Name</Label>
      <Input
        id="lastName"
        name="lastName"
        type="text"
        defaultValue={
          (actionState.payload?.get('lastName') as string) ?? user.lastName
        }
      />
      <FieldError actionState={actionState} name="lastName" />

      <SubmitButton label="Update Profile" />
    </Form>
  );
}
