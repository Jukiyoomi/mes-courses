import { H5, ScrollView, XStack, YStack } from "tamagui";
import { ThemedText } from "@/components/ThemedText";
import { Container } from "@/components/Container";
import {
  Link,
  Redirect,
  router,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Progressbar } from "@/components/Progressbar";
import { Dialog } from "@/components/Dialog";
import { useDeleteList, useUpdateList } from "@/queries/mutations";
import { useClassify, useGetListById } from "@/queries/queries";
import { Button } from "@/components/Button";
import { TogglableListItem } from "@/components/TogglableListItem";
import { Item } from "@/db/schema";

export default function ListScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data: list,
    isLoading: getByListIsLoading,
    refetch: getByListRefetch,
    isSuccess: getByListIsSuccess,
  } = useGetListById(Number(id));
  const {
    refetch: classifyRefectch,
    data: classifyData,
    isLoading: classifyIsLoading,
    isSuccess: classifyIsSuccess,
  } = useClassify(Number(id), list?.items ?? "");
  const { mutate } = useUpdateList(Number(id));

  const [itemsObj, setItemsObj] = useState<ClassifiedItems>([]);

  const flatItems = itemsObj.flatMap(({ items }) => items);

  const hasItemsChecked = flatItems.some((item) => item.taken);

  const checkedPercentage =
    (flatItems.filter((item) => item.taken).length / flatItems.length) * 100;

  const onClear = () => {
    const checked = flatItems
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
          getByListRefetch();
        },
      },
    );
  };

  const onCheck = (id: number) => {
    setItemsObj(
      itemsObj.map((item) =>
        item.id === id ? { ...item, taken: !item.taken } : item,
      ),
    );
  };

  useEffect(() => {
    if (isSuccess)
      if (list.items.length > 0)
        setItemsObj(
          list.items
            .split(",")
            .map((name, id) => ({ id, name: name.trim(), taken: false })),
        );
      else setItemsObj([]);
  }, [isSuccess, list]);

  useFocusEffect(
    useCallback(() => {
      getByListRefetch();
    }, []),
  );

  if (getByListIsLoading) return null;

  if (!id || !list) return <Redirect href="/lists" />;

  return (
    <Container>
      <XStack justifyContent="center" gap="$2">
        <ThemedText type="title">{list.name}</ThemedText>
        {list.isGlobal ? (
          <ThemedText type="subtitle">({"Liste globale"})</ThemedText>
        ) : null}
      </XStack>
      {itemsObj.length > 0 ? (
        <Progressbar value={checkedPercentage} shouldConfetti />
      ) : null}
      <XStack gap={16}>
        <Link href={`/lists/details/${list.id}/edit`} asChild>
          <Button flex={1}>Ajouter un item</Button>
        </Link>
        <DeleteDialog id={list.id.toString()} />
      </XStack>
      <ScrollView maxHeight={800} width="100%" borderRadius="$4">
        {itemsObj.length > 0 ? (
          <YStack gap={16}>
            <YStack gap={8} w="100%">
              {itemsObj.map((item, id) => (
                <TogglableListItem
                  key={id}
                  item={item}
                  onPress={() => onCheck(id)}
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
      <Button type="danger" flex={1}>
        Supprimer la liste
      </Button>
    </Dialog>
  );
}
