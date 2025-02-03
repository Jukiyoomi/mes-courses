import { Card, Form, TextArea, XStack, YStack } from "tamagui";
import { ThemedText } from "@/components/ThemedText";
import { Container } from "@/components/Container";
import { router, useLocalSearchParams } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { useUpdateList } from "@/queries/mutations";
import { Button } from "@/components/Button";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { db } from "@/db";
import { lists } from "@/db/schema";
import { eq } from "drizzle-orm";
import { TitleWithBackButton } from "@/components/TitleWithBackButton";

export default function ListEditScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: list } = useLiveQuery(
    db.query.lists.findFirst({
      where: eq(lists.id, +id),
    }),
    [id],
  );
  const [itemsToStr, setItemsToStr] = useState("");
  const { mutate, isPending, error } = useUpdateList(Number(id));

  const onSubmit = () => {
    mutate(
      {
        items: itemsToStr,
      },
      {
        onSuccess: () => {
          router.navigate({
            pathname: "/lists/[id]",
            params: { id },
          });
        },
      },
    );
  };

  useLayoutEffect(() => {
    if (!list) return;
    if (list.items.length > 0) setItemsToStr(list.items);
    else setItemsToStr("");
  }, [list]);

  if (!id) return router.navigate("/lists");

  if (!list) return null;

  return (
    <Container>
      <TitleWithBackButton>
        <ThemedText type="title" textAlign="center">
          Edition {list.name}
        </ThemedText>
      </TitleWithBackButton>
      <Form onSubmit={onSubmit}>
        <YStack>
          <Card elevate size="$4" bordered>
            <Card.Header padded gap={16}>
              <TextArea
                value={itemsToStr}
                onChangeText={(text) => setItemsToStr(text)}
                placeholder="Ajouter des items..."
                maxHeight="$40"
                scrollEnabled
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
