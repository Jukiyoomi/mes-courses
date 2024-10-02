import { StyleSheet } from "react-native";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { db } from "@/db";
import { lists } from "@/db/schema";
import { ScrollView } from "tamagui";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import Container from "@/components/Container";
import { router, useLocalSearchParams } from "expo-router";
import { eq } from "drizzle-orm";

export default function ListsScreen() {
  const { id } = useLocalSearchParams() as { id: string };
  const { data } = useLiveQuery(
    db
      .select()
      .from(lists)
      .where(eq(lists.id, Number(id)))
      .limit(1),
  );
  if (!id) {
    return router.push("/lists/index");
  }
  const list = data[0];
  return (
    <Container>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{list.name}</ThemedText>
      </ThemedView>
      <ScrollView maxHeight={800} width="100%" borderRadius="$4">
        <ThemedText type="default">{JSON.stringify(list, null, 2)}</ThemedText>
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
