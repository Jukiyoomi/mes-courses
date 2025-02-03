import { PropsWithChildren } from "react";
import { AlertDialog, Button, XStack, YStack } from "tamagui";

type Props = {
  onValidate: () => void;
  validateText: string;
  cancelText: string;
  description: string;
  title: string;
};

export function Dialog({
  onValidate,
  children,
  title,
  description,
  validateText,
  cancelText,
}: PropsWithChildren<Props>) {
  return (
    <AlertDialog native={true}>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <AlertDialog.Content
          bordered
          elevate
          key="content"
          x={0}
          scale={1}
          opacity={1}
          y={0}
        >
          <YStack gap={16} w="90%">
            <AlertDialog.Title>{title}</AlertDialog.Title>
            <AlertDialog.Description>{description}</AlertDialog.Description>

            <XStack gap="$3" justifyContent="flex-end">
              <AlertDialog.Cancel asChild>
                <Button variant="outlined">{cancelText}</Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild onPress={onValidate}>
                <Button>{validateText}</Button>
              </AlertDialog.Action>
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
}
