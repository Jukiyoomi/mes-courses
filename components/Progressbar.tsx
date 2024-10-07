import { useThemeColor } from "@/hooks/useThemeColor";
import { Progress, XStack } from "tamagui";
import ConfettiCannon from "react-native-confetti-cannon";
import { ThemedText } from "./ThemedText";
import React from "react";
import { getTokens } from "tamagui";

type Props = {
  value: number;
  shouldConfetti?: boolean;
};

export default function Progressbar({ value, shouldConfetti = false }: Props) {
  const yellowColor = getTokens().color.yellow.val;
  const lightPurpleColor = getTokens().color.lightPurple.val;
  const borderColor = useThemeColor(
    {
      light: lightPurpleColor,
      dark: yellowColor,
    },
    "background",
  );
  const bgColor = useThemeColor(
    {
      dark: lightPurpleColor,
      light: yellowColor,
    },
    "background",
  );
  return (
    <>
      <XStack gap={8} alignItems="center">
        <Progress
          height={5}
          borderWidth={0.1}
          bg={bgColor}
          borderColor={borderColor}
          size={100}
          value={value ?? 0}
          flex={1}
        >
          <Progress.Indicator animation="quick" />
        </Progress>
        <ThemedText>{value.toFixed(2)}%</ThemedText>
      </XStack>
      {shouldConfetti && value === 100 ? (
        <ConfettiCannon count={100} origin={{ x: -10, y: 0 }} />
      ) : null}
    </>
  );
}
