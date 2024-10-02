import { PropsWithChildren } from "react";
import { ThemedView } from "./ThemedView";
import Animated from "react-native-reanimated";
import { H3, Separator } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";

export default function Container({ children }: PropsWithChildren) {
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
          <H3 textAlign="center">Mes Courses</H3>
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
