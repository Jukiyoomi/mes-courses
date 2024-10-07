import { Item } from "@/db/schema";
import { H5, ScrollView, XStack, YStack } from "tamagui";
import { ThemedText } from "@/components/ThemedText";
import Container from "@/components/Container";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import Progressbar from "@/components/Progressbar";
import Dialog from "@/components/Dialog";
import { useDeleteList, useUpdateList } from "@/queries/mutations";
import { useGetListById } from "@/queries/queries";
import Button from "@/components/Button";
import TogglableListItem from "@/components/TogglableListItem";

export default function ListScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [items, setItems] = useState<Item[]>([]);

  const { data, isLoading, refetch } = useGetListById(Number(id));

  const { mutate } = useUpdateList(Number(id));

  const onClear = () => {
    const checked = items
      .filter((item) => !item.taken)
      .map((item) => item.name)
      .join(", ");
    console.log("Submitted Data:", checked);
    mutate(
      {
        items: checked,
      },
      {
        onSuccess: () => {
          refetch();
        },
      },
    );
  };

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

  if (!id || !list) return router.navigate("/lists");

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
            router.navigate({
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
                <TogglableListItem
                  key={id}
                  item={item}
                  onPress={() => {
                    setItems((prev) => {
                      const newItems = [...prev];
                      newItems[id].taken = !newItems[id].taken;
                      return newItems;
                    });
                  }}
                />
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
            onClear();
          }}
        >
          Retirer les items cochés
        </Button>
      ) : null}
    </Container>
  );
}

function DeleteDialog({ id }: { id: string }) {
  const { mutate } = useDeleteList(Number(id));
  return (
    <Dialog
      cancelText="Annuler"
      validateText="Supprimer"
      title="Supprimer la liste"
      description="Êtes-vous sûr de vouloir supprimer cette liste ?"
      onValidate={() => {
        console.log("Delete list", id);
        mutate(undefined, { onSuccess: () => router.navigate("/lists") });
      }}
    >
      <Button type="danger">Supprimer la liste</Button>
    </Dialog>
  );
}
