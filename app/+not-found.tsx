import React from "react";
import { Stack } from "expo-router";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Image } from "tamagui";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <ThemedView flex={1} alignItems="center" justifyContent="center">
        <ThemedView h="80%" w="100%" p={16} gap={16}>
          <Image
            w="100%"
            h="$16"
            source={require("@/assets/images/someone-lost-at-a-supermarket.png")}
          />
          <ThemedText type="title" textAlign="center">
            This screen doesn't exist.
          </ThemedText>
          <ThemedText>Go back using the arrow above.</ThemedText>
        </ThemedView>
      </ThemedView>
    </>
  );
}
