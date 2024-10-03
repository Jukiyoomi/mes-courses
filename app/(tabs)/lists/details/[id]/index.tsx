import { StyleSheet } from "react-native";
import { db } from "@/db";
import { Item, lists } from "@/db/schema";
import {
  AlertDialog,
  Button,
  Card,
  H5,
  ScrollView,
  XStack,
  YStack,
} from "tamagui";
import { ThemedText } from "@/components/ThemedText";
import Container from "@/components/Container";
import { router, useLocalSearchParams } from "expo-router";
import { eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
    refetchOnMount: true,
  });
  const list = data?.[0];
  const [items, setItems] = useState<Item[]>([]);
  const hasItemsChecked = items.some((item: Item) => item.taken);

  useEffect(() => {
    if (list) {
      setItems(list.items);
    }
  }, [list]);

  console.log("List", list);

  if (!id || !list) return router.push("/lists");

  if (isLoading) return null;

  return (
    <Container>
      <ThemedText type="title" textAlign="center">
        {"Liste inconnue"}
      </ThemedText>
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
          }}
        >
          Marquer comme non pris
        </Button>
      ) : null}
    </Container>
  );
}

function DeleteDialog({ id }: { id: string }) {
  return (
    <AlertDialog native>
      <AlertDialog.Trigger asChild>
        <Button
          variant="outlined"
          flex={1}
          // bg={"red"}
        >
          Supprimer la liste
        </Button>
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <AlertDialog.Content
          bordered
          elevate
          key="content"
          animation={[
            "quick",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          y={0}
        >
          <YStack>
            <AlertDialog.Title>Accept</AlertDialog.Title>
            <AlertDialog.Description>
              Are you sure you want to delete this list?
            </AlertDialog.Description>

            <XStack gap="$3" justifyContent="flex-end">
              <AlertDialog.Cancel asChild>
                <Button>Cancel</Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action
                asChild
                onPress={() => {
                  console.log("Delete list", id);
                  router.push({
                    pathname: "/lists/details/[id]/delete",
                    params: { id },
                  });
                }}
              >
                <Button>Accept</Button>
              </AlertDialog.Action>
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
