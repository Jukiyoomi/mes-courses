import { Card, YStack, Form, Input } from "tamagui";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import { router } from "expo-router";
import { Container } from "@/components/Container";
import { useCreateList } from "@/queries/mutations";
import { Button } from "@/components/Button";

export default function NewListScreen() {
  const [info, setInfo] = useState({ name: "" });
  const { mutate, isPending, error } = useCreateList();

  const onSubmit = () => {
    mutate(
      { info },
      {
        onSuccess: () => {
          setInfo({ name: "" });
          router.navigate("/lists");
        },
      },
    );
  };

  return (
    <Container>
      <ThemedText type="title" textAlign="center">
        Nouvelle Liste
      </ThemedText>
      <Form onSubmit={onSubmit}>
        <YStack>
          <Card elevate size="$4" bordered>
            <Card.Header padded gap={16}>
              <Input
                placeholder="Nom de la liste"
                value={info.name}
                onChangeText={(name) => setInfo({ ...info, name })}
              />
              <Form.Trigger asChild disabled={isPending}>
                <Button borderRadius="$10" disabled={isPending}>
                  {isPending ? "Chargement..." : "Créer"}
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
