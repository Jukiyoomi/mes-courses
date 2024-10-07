import { HelloWave } from "@/components/HelloWave";
import { ThemedView } from "@/components/ThemedView";
import { Image } from "tamagui";
import Container from "@/components/Container";

export default function HomeScreen() {
  return (
    <Container>
      <ThemedView gap="$8" flex={1} alignItems="center" justifyContent="center">
        <Image
          w="100%"
          h="$16"
          source={require("@/assets/images/someone-doing-their-shopping.png")}
        />
        <HelloWave />
      </ThemedView>
    </Container>
  );
}
