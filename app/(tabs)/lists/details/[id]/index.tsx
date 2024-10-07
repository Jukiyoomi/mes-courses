import { db } from "@/db";
import { Item, lists } from "@/db/schema";
import { Button, Card, H5, ScrollView, XStack, YStack } from "tamagui";
import { ThemedText } from "@/components/ThemedText";
import Container from "@/components/Container";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { eq } from "drizzle-orm";
import { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";
import Progressbar from "@/components/Progressbar";
import { updateListItemsSchema } from "@/lib/schemas/list";
import Dialog from "@/components/Dialog";

export default function ListScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [items, setItems] = useState<Item[]>([]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["list", id],
    queryFn: () => {
      return db
        .select()
        .from(lists)
        .where(eq(lists.id, Number(id)));
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["update-list"],
    mutationFn: () => {
      const checked = items
        .filter((item) => !item.taken)
        .map((item) => item.name)
        .join(", ");
      console.log("Submitted Data:", checked);
      const { data: parsed, error } = updateListItemsSchema.safeParse({
        items: checked,
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
      refetch();
    },
  });

  const list = data?.[0];
  const hasItemsChecked = items.some((item: Item) => item.taken);
  const checkedPercentage =
    (items.filter((item: Item) => item.taken).length / items.length) * 100;

  useEffect(() => {
    if (list) {
      setItems(list.items);
    }
  }, [list]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );

  console.log("List", list);

  if (!id || !list) return router.push("/lists");

  if (isLoading) return null;

  return (
    <Container>
      <ThemedText type="title" textAlign="center">
        {list.name}
      </ThemedText>
      {items.length > 0 ? (
        <Progressbar value={checkedPercentage} shouldConfetti />
      ) : null}
      <XStack gap={16}>
        <Button
          flex={1}
          onPress={() => {
            router.push({
              pathname: "/lists/details/[id]/edit",
              params: { id: list.id.toString() },
            });
          }}
        >
          Ajouter un item
        </Button>
        <DeleteDialog id={list.id.toString()} />
      </XStack>
      <ScrollView maxHeight={800} width="100%" borderRadius="$4">
        {items && items.length > 0 ? (
          <YStack gap={16}>
            <YStack gap={8} w="100%">
              {items.map((item, id) => (
                <Card
                  key={id}
                  elevate
                  size="$4"
                  flex={1}
                  bordered
                  bg={item.taken ? "gray" : "red"}
                  onPress={() => {
                    setItems((prev) => {
                      const newItems = [...prev];
                      newItems[id].taken = !newItems[id].taken;
                      return newItems;
                    });
                  }}
                >
                  <Card.Header
                    padded
                    flexDirection="row"
                    justifyContent="space-between"
                  >
                    <ThemedText>{item.name}</ThemedText>
                    <XStack gap={8}>
                      <Ionicons name="trash" size={24} color="black" />
                    </XStack>
                  </Card.Header>
                </Card>
              ))}
            </YStack>
          </YStack>
        ) : (
          <H5>No items in this list.</H5>
        )}
      </ScrollView>
      {hasItemsChecked ? (
        <Button
          borderRadius="$10"
          onPress={() => {
            console.log("Checked items");
            mutate();
          }}
        >
          Retirer les items cochés
        </Button>
      ) : null}
    </Container>
  );
}

function DeleteDialog({ id }: { id: string }) {
  return (
    <Dialog
      cancelText="Annuler"
      validateText="Supprimer"
      title="Supprimer la liste"
      description="Êtes-vous sûr de vouloir supprimer cette liste ?"
      onValidate={() => {
        console.log("Delete list", id);
        router.push({
          pathname: "/lists/details/[id]/delete",
          params: { id },
        });
      }}
    >
      <Button variant="outlined" flex={1} bg={"red"}>
        Supprimer la liste
      </Button>
    </Dialog>
  );
}
