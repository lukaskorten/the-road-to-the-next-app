import {
  cloneElement,
  MouseEventHandler,
  useActionState,
  useEffect,
  useRef,
  useState,
} from 'react';
import { toast } from 'sonner';
import { useActionFeedback } from './form/hooks/use-action-feedback';
import { ActionState, EMPTY_ACTION_STATE } from './form/utils/to-action-state';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { Button } from './ui/button';

type ConfirmDialogProps = {
  title?: string;
  description?: string;
  action: () => Promise<ActionState>;
  trigger:
    | React.ReactElement<{ onClick: MouseEventHandler }>
    | ((
        isPending: boolean,
      ) => React.ReactElement<{ onClick: MouseEventHandler }>);
  onSuccess?: () => void;
};

export function useConfirmDialog({
  title = 'Are you absolutely sure?',
  description = 'This action cannot be undone. Please make sure you understand the consequences.',
  action,
  trigger,
  onSuccess,
}: ConfirmDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [actionState, formAction, isPending] = useActionState(
    action,
    EMPTY_ACTION_STATE,
  );

  const toastRef = useRef<string | number | null>(null);

  useEffect(() => {
    if (isPending) {
      toastRef.current = toast.loading('Deleting...');
    } else if (toastRef.current) {
      toast.dismiss(toastRef.current);
    }

    return () => {
      if (toastRef.current) {
        toast.dismiss(toastRef.current);
      }
    };
  }, [isPending]);

  useActionFeedback(actionState, {
    onSuccess: ({ actionState }) => {
      if (actionState.message) {
        toast.success(actionState.message);
      }

      setIsOpen(false);
      onSuccess?.();
    },
    onError: ({ actionState }) => {
      if (actionState.message) {
        toast.error(actionState.message);
      }
    },
  });

  const dialogTrigger = cloneElement(
    typeof trigger === 'function' ? trigger(isPending) : trigger,
    {
      onClick: () => {
        setIsOpen((state) => !state);
      },
    },
  );

  const dialog = (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={formAction}>
            <AlertDialogAction asChild>
              <Button type="submit">Confirm</Button>
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return [dialogTrigger, dialog] as const;
}
