import { Card, YStack, Form, Input, XStack, Label, Checkbox } from "tamagui";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import { router } from "expo-router";
import { Container } from "@/components/Container";
import { useCreateList } from "@/queries/mutations";
import { Button } from "@/components/Button";
import { Ionicons } from "@expo/vector-icons";

export default function NewListScreen() {
  const [info, setInfo] = useState({ name: "", isGlobal: false });
  const { mutate, isPending, error } = useCreateList();

  const onSubmit = () => {
    mutate(
      { info },
      {
        onSuccess: () => {
          setInfo({ name: "", isGlobal: false });
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
              <XStack width={300} alignItems="center" gap="$4">
                <Label htmlFor="isGlobal">Liste Globale</Label>
                <Checkbox
                  id="isGlobal"
                  checked={info.isGlobal}
                  onCheckedChange={(isGlobal) =>
                    setInfo({
                      ...info,
                      isGlobal: Boolean(isGlobal),
                    })
                  }
                >
                  <Checkbox.Indicator>
                    <Ionicons name="checkmark-outline" />
                  </Checkbox.Indicator>
                </Checkbox>
              </XStack>
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
