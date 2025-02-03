import React, { PropsWithChildren } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { TamaguiProvider } from "tamagui";
import { tamaguiConfig } from "@/tamagui.config";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { queryClient } from "@/queries/client";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useReactQueryDevTools } from "@dev-plugins/react-query";

export default function AppProvider({ children }: PropsWithChildren) {
  useReactQueryDevTools(queryClient);
  const colorScheme = useColorScheme();
  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          {children}
        </ThemeProvider>
      </TamaguiProvider>
    </QueryClientProvider>
  );
}
