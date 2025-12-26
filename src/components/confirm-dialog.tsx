import {
  cloneElement,
  MouseEventHandler,
  useActionState,
  useState,
} from 'react';
import { Form } from './form/form';
import { SubmitButton } from './form/submit-button';
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

type ConfirmDialogProps = {
  title?: string;
  description?: string;
  action: () => Promise<ActionState>;
  trigger: React.ReactElement<{ onClick: MouseEventHandler }>;
};

export function useConfirmDialog({
  title = 'Are you absolutely sure?',
  description = 'This action cannot be undone. Please make sure you understand the consequences.',
  action,
  trigger,
}: ConfirmDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [actionState, formAction] = useActionState(action, EMPTY_ACTION_STATE);

  const dialogTrigger = cloneElement(trigger, {
    onClick: () => {
      setIsOpen((state) => !state);
    },
  });

  const handleSuccess = () => {
    setIsOpen(false);
  };

  const dialog = (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Form
              action={formAction}
              actionState={actionState}
              onSuccess={handleSuccess}
            >
              <SubmitButton label="Confirm" />
            </Form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return [dialogTrigger, dialog] as const;
}
