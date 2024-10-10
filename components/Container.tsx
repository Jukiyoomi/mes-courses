import { PropsWithChildren } from "react";
import { ThemedView } from "./ThemedView";
import Animated from "react-native-reanimated";
import { Separator } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import { ThemedText } from "./ThemedText";

export function Container({ children }: PropsWithChildren) {
  const theme = useColorScheme();
  return (
    <ThemedView paddingBlock={40} paddingInline={20} flex={1} gap={16}>
      <Animated.View>
        <ThemedView
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          gap={16}
        >
          <ThemedText type="title">Mes Courses</ThemedText>
          <Ionicons
            name="cart"
            size={30}
            color={theme === "light" ? "black" : "white"}
          />
        </ThemedView>
        <Separator margin={16} bg="red" />
      </Animated.View>
      <ThemedView flex={1} gap={16}>
        {children}
      </ThemedView>
    </ThemedView>
  );
}
