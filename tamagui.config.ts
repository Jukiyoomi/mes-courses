import { tokens as tk } from "./lib/theme";
import { config } from "@tamagui/config/v3";
import { createTamagui } from "tamagui";

const { tokens, ...rest } = config;

export const tamaguiConfig = createTamagui({
  tokens: tk,
  ...rest,
});

export type Conf = typeof tamaguiConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
