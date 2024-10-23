import { H5, Progress, ScrollView, XStack, YStack } from "tamagui";
import { ThemedText } from "./ThemedText";
import { TogglableListItem } from "./TogglableListItem";
import { ClassifiedItems } from "@/lib/schemas/list";

type Props = {
  itemsObj: ClassifiedItems;
  setItemsObj: (classified: ClassifiedItems) => void;
};

export function LabeledItemsList({ itemsObj, setItemsObj }: Props) {
  const onCheck = (type: string, id: number) => {
    const updated = itemsObj.map((classified) => {
      if (classified.type === type) {
        return {
          type,
          items: classified.items.map((item) =>
            item.id === id ? { ...item, taken: !item.taken } : item,
          ),
        };
      }
      return classified;
    });
    setItemsObj(updated);
  };
  return (
    <ScrollView maxHeight={800} width="100%" borderRadius="$4">
      <YStack gap="$5">
        {itemsObj.length > 0 ? (
          itemsObj.map((classified) => (
            <YStack key={classified.type} gap="$2">
              <XStack width="100%" alignItems="center" gap="$2">
                <ThemedText type="subtitle">{classified.type}</ThemedText>
                <Progress height={2} bg="$yellow" size={1} value={1} flex={1} />
              </XStack>
              <YStack gap={8} w="100%">
                {classified.items.map((item, id) => (
                  <TogglableListItem
                    key={item.id}
                    item={item}
                    onPress={() => onCheck(classified.type, id)}
                  />
                ))}
              </YStack>
            </YStack>
          ))
        ) : (
          <H5>No items in this list.</H5>
        )}
      </YStack>
    </ScrollView>
  );
}
