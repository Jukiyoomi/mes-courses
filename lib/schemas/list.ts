import { z } from "zod";

export const createListSchema = z.object({
  name: z.string({ required_error: "Le nom de la liste est requis" }),
});
