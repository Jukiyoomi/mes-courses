import { Image, StyleSheet } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { db } from "@/db";
import { lists } from "@/db/schema";
import { Card, YStack, Form } from "tamagui";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Button, Input } from "tamagui";
import { useState } from "react";
import { router } from "expo-router";

export default function NewListScreen() {
  const [data, setData] = useState({ name: "", loading: false });

  const onSubmit = () => {
    // Simulate form submission
    setData({ ...data, loading: true });
    console.log("Submitted Data:", data);
    db.insert(lists)
      .values(data)
      .returning({ id: lists.id })
      .then(() => {
        setData({ name: "", loading: false });
        router.push("/lists");
      });
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Nouvelle Liste</ThemedText>
      </ThemedView>
      <Form onSubmit={onSubmit}>
        <YStack>
          <Card elevate size="$4" bordered>
            <Card.Header padded gap={16}>
              <Input
                placeholder="Nom de la liste"
                value={data.name}
                onChangeText={(name) => setData({ ...data, name })}
              />
              <Form.Trigger asChild disabled={data.loading}>
                <Button borderRadius="$10" disabled={data.loading}>
                  {data.loading ? "Chargement..." : "Créer"}
                </Button>
              </Form.Trigger>
            </Card.Header>
          </Card>
        </YStack>
      </Form>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
