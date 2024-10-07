import { Button, Card, H4, Image } from "tamagui";
import { ThemedText } from "./ThemedText";
import { InferSelectModel } from "drizzle-orm";
import { lists } from "@/db/schema";
import { router } from "expo-router";

type Props = {
  list: InferSelectModel<typeof lists>;
};

export default function ListCardItem({ list }: Props) {
  return (
    <Card elevate size="$4" bordered>
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
          pos="absolute"
          w={290}
          h={178}
          bottom={0}
          left={0}
          source={require("@/assets/images/partial-react-logo.png")}
        />
      </Card.Background>
    </Card>
  );
}
