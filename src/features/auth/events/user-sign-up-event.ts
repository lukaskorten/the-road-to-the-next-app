import { eventType, staticSchema } from 'inngest';

export type UserSignUpPayload = {
  userId: string;
};

export const userSignUp = eventType('app/user.signup', {
  schema: staticSchema<UserSignUpPayload>(),
});
