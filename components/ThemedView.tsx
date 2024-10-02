import { useThemeColor } from "@/hooks/useThemeColor";
import { View, type ViewProps } from "tamagui";
import { ColorsType } from "@/constants/Colors";

export type ThemedViewProps = ViewProps & ColorsType;

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );

  if (otherProps.backgroundColor || otherProps.bg)
    return <View style={style} {...otherProps} />;

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
