import { StyleSheet } from "react-native";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { db } from "@/db";
import { lists } from "@/db/schema";
import { ScrollView, YStack } from "tamagui";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import Container from "@/components/Container";
import ListCardItem from "@/components/ListCard";

export default function ListsScreen() {
  const { data } = useLiveQuery(db.select().from(lists));
  return (
    <Container>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Mes Listes</ThemedText>
      </ThemedView>
      <ScrollView maxHeight={800} width="100%" borderRadius="$4">
        <YStack gap="$6">
          {data.map((list) => (
            <ListCardItem key={list.id} list={list} />
          ))}
        </YStack>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
