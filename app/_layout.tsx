import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import "react-native-reanimated";
import "@tamagui/core/reset.css";
import { useMigrationHelper } from "@/db";
import { ThemedText } from "@/components/ThemedText";
import AppProvider from "@/app/providers";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { success, error } = useMigrationHelper();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  if (error) {
    return (
      <ThemedText>
        Une erreur lors de la mise en place est survenue : {error.message}
      </ThemedText>
    );
  }

  if (!success) {
    return <ThemedText>Initialisation de la base de données...</ThemedText>;
  }

  return (
    <AppProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(details-tabs)"
          options={{
            title: "Détails de liste",
            headerShown: true,
            presentation: "transparentModal",
            animation: "flip",
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
    </AppProvider>
  );
}
