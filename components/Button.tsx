import { useThemeColor } from "@/hooks/useThemeColor";
import { PropsWithChildren } from "react";
import { Button as TamaguiButton, ButtonProps, getTokens } from "tamagui";

type Props = ButtonProps & {
  type?: "default" | "secondary" | "danger";
};

export default function Button({
  children,
  type = "default",
  ...props
}: PropsWithChildren<Props>) {
  const yellowColor = getTokens().color.yellow.val;
  const lightPurpleColor = getTokens().color.lightPurple.val;
  const bgColor = useThemeColor(
    {
      light: lightPurpleColor,
      dark: yellowColor,
    },
    "background",
  );
  const textColor = useThemeColor(
    {
      light: yellowColor,
      dark: lightPurpleColor,
    },
    "text",
  );

  if (type === "secondary") {
    return (
      <TamaguiButton
        variant="outlined"
        bg={bgColor}
        color={textColor}
        borderWidth={2}
        borderColor="$colorTransparent"
        {...props}
      >
        {children}
      </TamaguiButton>
    );
  }

  if (type === "danger") {
    return (
      <TamaguiButton
        bg="red"
        color="white"
        borderWidth={2}
        borderColor="$colorTransparent"
        hoverStyle={{ bg: "red.500" }}
        {...props}
      >
        {children}
      </TamaguiButton>
    );
  }

  return (
    <TamaguiButton
      bg={bgColor}
      color={textColor}
      borderWidth={2}
      borderColor="$colorTransparent"
      {...props}
    >
      {children}
    </TamaguiButton>
  );
}
