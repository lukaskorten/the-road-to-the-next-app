import z, { ZodError } from 'zod';

export type ActionState = {
  status?: 'SUCCESS' | 'ERROR';
  message: string;
  payload?: FormData;
  fieldErrors: Record<string, string[] | undefined>;
  timestamp: number;
};

export const EMPTY_ACTION_STATE: ActionState = {
  message: '',
  fieldErrors: {},
  timestamp: Date.now(),
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
      timestamp: Date.now(),
    };
  } else if (error instanceof Error) {
    return {
      status: 'ERROR',
      message: error.message,
      payload: formData,
      fieldErrors: {},
      timestamp: Date.now(),
    };
  } else {
    return {
      status: 'ERROR',
      message: 'Something went wrong',
      payload: formData,
      fieldErrors: {},
      timestamp: Date.now(),
    };
  }
}

export function toSuccessActionState(message: string): ActionState {
  return {
    status: 'SUCCESS',
    message,
    fieldErrors: {},
    timestamp: Date.now(),
  };
}
