import z, { ZodError } from 'zod';

export type ActionState = {
  message: string;
  payload?: FormData;
  fieldErrors: Record<string, string[] | undefined>;
};

export function fromErrorToActionState(
  error: unknown,
  formData: FormData
): ActionState {
  if (error instanceof ZodError) {
    return {
      message: '',
      payload: formData,
      fieldErrors: z.flattenError(error).fieldErrors,
    };
  } else if (error instanceof Error) {
    return {
      message: error.message,
      payload: formData,
      fieldErrors: {},
    };
  } else {
    return {
      message: 'Something went wrong',
      payload: formData,
      fieldErrors: {},
    };
  }
}
