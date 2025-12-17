import z, { ZodError } from 'zod';

export type ActionState = {
  status?: 'SUCCESS' | 'ERROR';
  message: string;
  payload?: FormData;
  fieldErrors: Record<string, string[] | undefined>;
};

export const EMPTY_ACTION_STATE: ActionState = {
  message: '',
  fieldErrors: {},
};

export function fromErrorToActionState(
  error: unknown,
  formData: FormData
): ActionState {
  if (error instanceof ZodError) {
    return {
      status: 'ERROR',
      message: '',
      payload: formData,
      fieldErrors: z.flattenError(error).fieldErrors,
    };
  } else if (error instanceof Error) {
    return {
      status: 'ERROR',
      message: error.message,
      payload: formData,
      fieldErrors: {},
    };
  } else {
    return {
      status: 'ERROR',
      message: 'Something went wrong',
      payload: formData,
      fieldErrors: {},
    };
  }
}

export function toSuccessActionState(message: string): ActionState {
  return {
    status: 'SUCCESS',
    message,
    fieldErrors: {},
  };
}
