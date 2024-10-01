import { Image, StyleSheet } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { db } from "@/db";
import { lists } from "@/db/schema";
import { Card, H3, ScrollView, YStack } from "tamagui";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "tamagui";

export default function ListsScreen() {
  const { data } = useLiveQuery(db.select().from(lists));
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Mes Listes</ThemedText>
      </ThemedView>
      <ScrollView
        maxHeight={400}
        width="100%"
        // backgroundColor="$background"
        // padding="$4"
        borderRadius="$4"
      >
        <YStack gap={16}>
          {data.map((list) => (
            <Card key={list.id} elevate size="$4" bordered>
              <Card.Header padded>
                <H3>{list.name}</H3>
                <Button borderRadius="$10">Voir plus</Button>
              </Card.Header>
            </Card>
          ))}
        </YStack>
      </ScrollView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
