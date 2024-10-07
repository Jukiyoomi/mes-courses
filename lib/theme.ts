import { config } from "@tamagui/config";
import { createTokens } from "tamagui";

const { color, ...rest } = config.tokens;

export const tokens = createTokens({
  color: {
    lightPurple: "#4B2D73",
    darkPurple: "#1C053A",
    yellow: "#D4BA6A",
    darkYellow: "#806515",
    // white: "#EEEEEE",
    red: "#FF0000",
  },
  ...rest,
});
