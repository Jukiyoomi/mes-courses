import { Card, Form, TextArea, YStack } from "tamagui";
import { ThemedText } from "@/components/ThemedText";
import Container from "@/components/Container";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useUpdateList } from "@/queries/mutations";
import { useGetListById } from "@/queries/queries";
import Button from "@/components/Button";

export default function ListScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading } = useGetListById(Number(id));
  const [itemsToStr, setItemsToStr] = useState("");
  const { mutate, isPending, error } = useUpdateList(Number(id));

  const list = data?.[0];

  const onSubmit = () => {
    mutate(
      {
        items: itemsToStr,
      },
      {
        onSuccess: () => {
          router.navigate({
            pathname: "/lists/details/[id]",
            params: { id },
          });
        },
      },
    );
  };

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
      <Form onSubmit={onSubmit}>
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
