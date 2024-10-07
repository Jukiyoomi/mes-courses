import { z } from "zod";

export const createListSchema = z.object({
  name: z.string({ required_error: "Le nom de la liste est requis" }),
});

export const updateListItemsSchema = z.object({
  items: z.string().transform((val) => {
    const uniqueItems = Array.from(
      new Set(val.split(",").map((item) => item.trim().toLowerCase())),
    );
    return uniqueItems
      .filter((item) => item !== "")
      .map((item) => ({
        name: item.charAt(0).toUpperCase() + item.slice(1),
        taken: false,
      }));
  }),
});
