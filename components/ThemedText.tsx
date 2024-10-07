import { StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { getTokens, Text, type TextProps } from "tamagui";
import { ColorsType } from "@/constants/Colors";

export type ThemedTextProps = TextProps &
  ColorsType & {
    type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
  };

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor(
    {
      light: getTokens().color.lightPurple.val,
      dark: getTokens().color.yellow.val,
    },
    "text",
  );

  if (rest.color) return <Text style={[styles[type], style]} {...rest} />;

  return <Text style={[{ color }, styles[type], style]} {...rest} />;
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
});
