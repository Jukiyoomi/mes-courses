import { z } from "zod";

export const createListSchema = z.object({
  name: z.string({ required_error: "Le nom de la liste est requis" }),
});

export type CreateListSchema = z.infer<typeof createListSchema>;

export const updateListItemsSchema = z.object({
  items: z.string().transform((val) => {
    const uniqueItems = Array.from(
      new Set(val.split(",").map((item) => item.trim().toLowerCase())),
    );
    return uniqueItems
      .filter((item) => item !== "")
      .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
      .join(", ");
  }),
});

export type UpdateListItemsSchema = z.infer<typeof updateListItemsSchema>;
