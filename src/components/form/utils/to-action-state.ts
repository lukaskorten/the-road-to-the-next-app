import { ZodError } from 'zod';

export type ActionState = {
  message: string;
  payload?: FormData;
};

export function fromErrorToActionState(
  error: unknown,
  formData: FormData
): ActionState {
  if (error instanceof ZodError) {
    return {
      message: error.issues.map((e) => e.message).join(', '),
      payload: formData,
    };
  } else if (error instanceof Error) {
    return {
      message: error.message,
      payload: formData,
    };
  } else {
    return {
      message: 'Something went wrong',
      payload: formData,
    };
  }
}
