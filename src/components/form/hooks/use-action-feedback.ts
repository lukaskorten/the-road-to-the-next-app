import { useEffect } from 'react';
import { ActionState } from '../utils/to-action-state';

type OnArgs = {
  actionState: ActionState;
};

type UseActionFeedbackOptions = {
  onSuccess?: (args: OnArgs) => void;
  onError?: (args: OnArgs) => void;
};

export function useActionFeedback(
  actionState: ActionState,
  options: UseActionFeedbackOptions
) {
  useEffect(() => {
    if (actionState.status === 'ERROR') {
      options.onError?.({ actionState });
    }

    if (actionState.status === 'SUCCESS') {
      options.onSuccess?.({ actionState });
    }
  }, [actionState, options]);
}
