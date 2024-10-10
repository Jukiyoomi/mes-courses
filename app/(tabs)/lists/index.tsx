import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { db } from "@/db";
import { lists } from "@/db/schema";
import { H5, ScrollView, YStack } from "tamagui";
import { ThemedText } from "@/components/ThemedText";
import { Container } from "@/components/Container";
import { ListCardItem } from "@/components/ListCard";

export default function ListsScreen() {
  const { data } = useLiveQuery(db.select().from(lists));

  return (
    <Container>
      <ThemedText type="title" textAlign="center">
        Mes Listes
      </ThemedText>
      <ScrollView maxHeight={800} width="100%">
        {data.length > 0 ? (
          <YStack gap="$6">
            {data.map((list) => (
              <ListCardItem key={list.id} list={list} />
            ))}
          </YStack>
        ) : (
          <H5>Pas de listes.</H5>
        )}
      </ScrollView>
    </Container>
  );
}
