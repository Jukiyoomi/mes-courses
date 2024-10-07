import { db } from "@/db";
import { lists } from "@/db/schema";
import {
  CreateListSchema,
  createListSchema,
  updateListItemsSchema,
} from "@/lib/schemas/list";
import { useMutation } from "@tanstack/react-query";
import { eq } from "drizzle-orm";

export const useCreateList = () =>
  useMutation({
    mutationKey: ["create-list"],
    mutationFn: ({ info }: { info: CreateListSchema }) => {
      console.log("Submitted Data:", info);
      const { data: newList, error } = createListSchema.safeParse(info);
      if (error) throw error.issues[0].message;
      return db.insert(lists).values(newList);
    },
    onError: (error) => {
      console.log("Error:", error);
      if (error.message.includes("UNIQUE constraint failed")) {
        throw "Ce nom de liste existe déjà.";
      }
    },
  });

export const useUpdateList = (id: number) =>
  useMutation({
    mutationKey: ["update-list"],
    mutationFn: ({ items }: { items: string }) => {
      console.log("Submitted Data:", items);
      const { data: parsed, error } = updateListItemsSchema.safeParse({
        items,
      });
      if (error) throw error?.issues[0].message ?? "Invalid data";
      return db
        .update(lists)
        .set({ items: parsed.items })
        .where(eq(lists.id, id));
    },
    onError: (error) => {
      console.log("Error:", error);
    },
  });

export const useDeleteList = (id: number) =>
  useMutation({
    mutationKey: ["delete-list", id],
    mutationFn: () => {
      return db.delete(lists).where(eq(lists.id, id));
    },
    onError: (error) => {
      console.log("Error:", error);
    },
  });
