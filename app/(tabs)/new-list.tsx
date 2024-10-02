import { StyleSheet } from "react-native";
import { db } from "@/db";
import { lists } from "@/db/schema";
import { Card, YStack, Form, Button, Input } from "tamagui";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import { router } from "expo-router";
import { createListSchema } from "@/lib/schemas/list";
import { useMutation } from "@tanstack/react-query";
import Container from "@/components/Container";

export default function NewListScreen() {
  const [info, setInfo] = useState({ name: "" });
  const { mutate, isPending, error } = useMutation({
    mutationKey: ["create-list"],
    mutationFn: () => {
      console.log("Submitted Data:", info);
      const { data: newList, error } = createListSchema.safeParse(info);
      if (error) {
        throw error.issues[0].message;
      }
      return db.insert(lists).values(newList).returning({ id: lists.id });
    },
    onError: (error) => {
      console.log("Error:", error);
    },
    onSuccess: () => {
      router.push("/lists");
    },
  });

  return (
    <Container>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Nouvelle Liste</ThemedText>
      </ThemedView>
      <Form onSubmit={mutate}>
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
                  {error}
                </ThemedText>
              </Card.Footer>
            ) : null}
          </Card>
        </YStack>
      </Form>
    </Container>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
