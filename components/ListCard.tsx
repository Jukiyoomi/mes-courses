import { Button, Card, H4, Image } from "tamagui";
import { ThemedText } from "./ThemedText";
import { InferSelectModel } from "drizzle-orm";
import { lists } from "@/db/schema";

type Props = {
  list: InferSelectModel<typeof lists>;
};

export default function ListCardItem({ list }: Props) {
  return (
    <Card elevate size="$4" bordered>
      <Card.Header padded>
        <H4>{list.name}</H4>
        <ThemedText>5 items en attente.</ThemedText>
        <Button borderRadius="$10">Voir plus</Button>
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