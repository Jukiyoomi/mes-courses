import { PropsWithChildren } from "react";
import { Link } from "expo-router";
import { Button } from "@/components/Button";
import { Ionicons } from "@expo/vector-icons";
import { XStack } from "tamagui";

export function TitleWithBackButton({ children }: PropsWithChildren) {
  return (
    <XStack gap={16} alignItems="center">
      <Link href="../" asChild>
        <Button w="$5" h="$3">
          <Ionicons name="arrow-back" size={16} />
        </Button>
      </Link>
      {children}
    </XStack>
  );
}
