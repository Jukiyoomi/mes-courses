import { db } from "@/db";
import { lists } from "@/db/schema";
import { Button, Card, Form, TextArea, YStack } from "tamagui";
import { ThemedText } from "@/components/ThemedText";
import Container from "@/components/Container";
import { router, useLocalSearchParams } from "expo-router";
import { eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { updateListItemsSchema } from "@/lib/schemas/list";
import { Ionicons } from "@expo/vector-icons";

export default function ListScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading } = useQuery({
    queryKey: ["list", id],
    queryFn: () => {
      return db
        .select()
        .from(lists)
        .where(eq(lists.id, Number(id)));
    },
  });

  const list = data?.[0];

  const [itemsToStr, setItemsToStr] = useState("");

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["update-list"],
    mutationFn: () => {
      console.log("Submitted Data:", itemsToStr);
      const { data: parsed, error } = updateListItemsSchema.safeParse({
        items: itemsToStr,
      });
      if (error) throw error?.issues[0].message ?? "Invalid data";
      return db
        .update(lists)
        .set({ items: parsed.items })
        .where(eq(lists.id, Number(id)));
    },
    onError: (error) => {
      console.log("Error:", error);
    },
    onSuccess: () => {
      router.navigate({
        pathname: "/lists/details/[id]",
        params: { id },
      });
    },
  });

  useEffect(() => {
    if (list && list.items.length > 0) {
      setItemsToStr(
        list.items.reduce(
          (acc, item) => (acc ? `${acc}, ${item.name}` : item.name),
          "",
        ),
      );
    }
  }, [list]);

  if (!id || !list) return router.navigate("/lists");

  if (isLoading) return null;

  return (
    <Container>
      <ThemedText type="title" textAlign="center">
        Edition {list.name}
      </ThemedText>
      <Button
        onPress={() =>
          router.navigate({
            pathname: "/lists/details/[id]",
            params: { id },
          })
        }
        w="$12"
      >
        <Ionicons name="arrow-back" size={24} />
        Retour
      </Button>
      <Form onSubmit={mutate}>
        <YStack>
          <Card elevate size="$4" bordered>
            <Card.Header padded gap={16}>
              <TextArea
                value={itemsToStr}
                onChangeText={(text) => setItemsToStr(text)}
                placeholder="Ajouter des items..."
              />
              <Form.Trigger asChild disabled={isPending}>
                <Button borderRadius="$10" disabled={isPending}>
                  {isPending ? "Chargement..." : "Ajouter"}
                </Button>
              </Form.Trigger>
            </Card.Header>
            {error ? (
              <Card.Footer padded>
                <ThemedText type="default" color="red">
                  {JSON.stringify(error)}
                </ThemedText>
              </Card.Footer>
            ) : null}
          </Card>
        </YStack>
      </Form>
    </Container>
  );
}
