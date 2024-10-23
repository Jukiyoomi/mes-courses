import { XStack } from "tamagui";
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
import { LabeledItemsList } from "@/components/LabeledItemList";
import { ClassifiedItems } from "@/lib/schemas/list";

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

  useEffect(() => {
    if (getByListIsSuccess && list.items.length > 0) {
      const formattedItems = list.items
        .split(",")
        .map((name, id) => ({ id, name: name.trim(), taken: false }));
      setItemsObj([
        {
          type: "all",
          items: formattedItems,
        },
      ]);
    } else setItemsObj([]);
  }, [getByListIsSuccess, list]);

  useEffect(() => {
    if (classifyIsSuccess && classifyData) setItemsObj(classifyData);
  }, [classifyIsSuccess, classifyData]);

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
      {list.isGlobal ? (
        <Button
          w={"100%"}
          variant="outlined"
          disabled={list.items === "" || classifyIsLoading}
          onPress={() => {
            console.log("Submitted Data:", list.items);
            classifyRefectch();
          }}
        >
          {classifyIsLoading
            ? "Classification en cours..."
            : "Classifier les items"}
        </Button>
      ) : null}
      <LabeledItemsList itemsObj={itemsObj} setItemsObj={setItemsObj} />
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
