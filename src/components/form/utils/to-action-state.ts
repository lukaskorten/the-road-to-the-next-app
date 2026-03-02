import z, { ZodError } from 'zod';

export type ActionState<T = unknown> = {
  status?: 'SUCCESS' | 'ERROR';
  message: string;
  payload?: FormData;
  fieldErrors: Record<string, string[] | undefined>;
  timestamp: number;
  data?: T;
};

export const EMPTY_ACTION_STATE: ActionState = {
  message: '',
  fieldErrors: {},
  timestamp: Date.now(),
};

export function emptyActionState<T>(): ActionState<T> {
  return {
    message: '',
    fieldErrors: {},
    timestamp: Date.now(),
  };
}

export function fromErrorToActionState<T>(
  error: unknown,
  formData?: FormData,
): ActionState<T> {
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

export function toSuccessActionState<T>(
  message: string,
  data?: T,
): ActionState<T> {
  return {
    status: 'SUCCESS',
    message,
    fieldErrors: {},
    timestamp: Date.now(),
    data,
  };
}

export function toErrorActionState<T>(
  message: string,
  payload?: FormData,
): ActionState<T> {
  return {
    status: 'ERROR',
    message,
    payload,
    fieldErrors: {},
    timestamp: Date.now(),
  };
}
