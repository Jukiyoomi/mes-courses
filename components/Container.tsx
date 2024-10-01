import { PropsWithChildren } from "react";
import { ThemedView } from "./ThemedView";

export default function Container({ children }: PropsWithChildren) {
  return (
    <ThemedView flex={1} paddingBlock={60} paddingInline={20} gap={16}>
      {children}
    </ThemedView>
  );
}
