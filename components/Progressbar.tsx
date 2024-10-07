import { useThemeColor } from "@/hooks/useThemeColor";
import { Progress, XStack } from "tamagui";
import ConfettiCannon from "react-native-confetti-cannon";
import { ThemedText } from "./ThemedText";
import React from "react";

type Props = {
  value: number;
  shouldConfetti?: boolean;
};

export default function Progressbar({ value, shouldConfetti = false }: Props) {
  const color = useThemeColor({ light: "black", dark: "white" }, "background");
  return (
    <>
      <XStack gap={8} alignItems="center">
        <Progress
          height={5}
          borderWidth={0.1}
          borderColor={color}
          size={100}
          value={value ?? 0}
          flex={1}
        >
          <Progress.Indicator animation="quick" />
        </Progress>
        <ThemedText>{value}%</ThemedText>
      </XStack>
      {shouldConfetti && value === 100 ? (
        <ConfettiCannon count={100} origin={{ x: -10, y: 0 }} />
      ) : null}
    </>
  );
}
