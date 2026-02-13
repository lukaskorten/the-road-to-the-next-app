import { useEffect, useRef } from 'react';
import { ActionState } from '../utils/to-action-state';

type OnArgs<T> = {
  actionState: ActionState<T>;
};

type UseActionFeedbackOptions<T> = {
  onSuccess?: (args: OnArgs<T>) => void;
  onError?: (args: OnArgs<T>) => void;
};

export function useActionFeedback<T>(
  actionState: ActionState<T>,
  options: UseActionFeedbackOptions<T>,
) {
  const timestampRef = useRef(actionState.timestamp);

  useEffect(() => {
    // Since the options object changes on each render (it gets re-initialized every time),
    // a ref is used to compare the last timestamp
    // with the current one to avoid unnecessary calls.

    if (timestampRef.current === actionState.timestamp) return;
    console.log('actionState changed:', actionState);
    if (actionState.status === 'ERROR') {
      options.onError?.({ actionState });
    }

    if (actionState.status === 'SUCCESS') {
      options.onSuccess?.({ actionState });
    }

    timestampRef.current = actionState.timestamp;
  }, [actionState, options]);
}
