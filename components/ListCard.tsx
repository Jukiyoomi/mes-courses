import { Card, H4, Image } from "tamagui";
import { ThemedText } from "./ThemedText";
import { InferSelectModel } from "drizzle-orm";
import { lists } from "@/db/schema";
import { Link } from "expo-router";
import { Button } from "./Button";

type Props = {
  list: InferSelectModel<typeof lists>;
};

export function ListCardItem({ list }: Props) {
  const itemsCount = list.items
    .split(",")
    .filter((item) => item.trim() !== "").length;

  return (
    <Card size="$5" bordered overflow="hidden">
      <Card.Header padded>
        <H4>
          {list.name} - {list.id}
        </H4>
        <ThemedText>{itemsCount} items en attente.</ThemedText>
        <Link href={`/lists/${list.id}`} asChild>
          <Button borderRadius="$10">Voir plus</Button>
        </Link>
      </Card.Header>
      <Card.Background>
        <Image
          w="100%"
          h="100%"
          opacity={0.4}
          source={require("@/assets/images/someone-doing-their-shopping.png")}
        />
      </Card.Background>
    </Card>
  );
}
