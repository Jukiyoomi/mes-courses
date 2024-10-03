import { z } from "zod";

export const createListSchema = z.object({
  name: z.string({ required_error: "Le nom de la liste est requis" }),
});

export const addListItemsSchema = z.object({
  items: z.string().transform((val) =>
    val.split(",").map((item) => ({
      name: item.trim().toUpperCase()[0] + item.trim().slice(1),
      taken: false,
    })),
  ),
});
