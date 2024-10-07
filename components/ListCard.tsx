import { Card, H4, Image } from "tamagui";
import { ThemedText } from "./ThemedText";
import { InferSelectModel } from "drizzle-orm";
import { lists } from "@/db/schema";
import { router } from "expo-router";
import Button from "./Button";

type Props = {
  list: InferSelectModel<typeof lists>;
};

export default function ListCardItem({ list }: Props) {
  return (
    <Card size="$5" bordered overflow="hidden">
      <Card.Header padded>
        <H4>
          {list.name} - {list.id}
        </H4>
        <ThemedText>{list.items.length} items en attente.</ThemedText>
        <Button
          borderRadius="$10"
          onPress={() => {
            router.navigate({
              pathname: "/lists/details/[id]",
              params: { id: list.id.toString() },
            });
          }}
        >
          Voir plus
        </Button>
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
