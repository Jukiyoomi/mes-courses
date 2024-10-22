import { Card, getTokens } from "tamagui";
import { ThemedText } from "./ThemedText";
import { Item } from "@/db/schema";
import { useColorScheme } from "react-native";

type Props = {
  item: Item;
  onPress: () => void;
};

export function TogglableListItem({ item, onPress }: Props) {
  const theme = useColorScheme();
  const yellowColor = getTokens().color.$yellow.val;
  const lightPurpleColor = getTokens().color.$lightPurple.val;

  const textColor =
    theme === "light" || item.taken ? lightPurpleColor : yellowColor;
  const bgColor = item.taken ? yellowColor : "$colorTransparent";
  return (
    <Card
      size="$4"
      flex={1}
      bordered
      borderColor={textColor}
      bg={bgColor}
      onPress={onPress}
    >
      <Card.Header padded>
        <ThemedText textAlign="center" color={textColor}>
          {item.name}
        </ThemedText>
      </Card.Header>
    </Card>
  );
}
