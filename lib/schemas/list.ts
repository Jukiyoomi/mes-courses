import { z } from "zod";

export const createListSchema = z.object({
  name: z.string({ required_error: "Le nom de la liste est requis" }),
  isGlobal: z.boolean(),
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

export const classifyListItemsSchema = z.string().transform((val) => {
  const lines = val.trim().split(";");
  const result = lines.map((line) => {
    const [type, itemsString] = line.split(":");

    const items = itemsString
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    return {
      type: type.replaceAll("*", "").trim(),
      items: items.map((item, id) => ({
        id,
        name: item,
        taken: false,
      })),
    };
  });
  return result;
});

export type ClassifiedItems = z.infer<typeof classifyListItemsSchema>;
export type Item = ClassifiedItems[number]["items"][number];
