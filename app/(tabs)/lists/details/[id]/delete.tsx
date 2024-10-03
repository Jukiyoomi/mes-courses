import { db } from "@/db";
import { lists } from "@/db/schema";
import { Redirect, useLocalSearchParams } from "expo-router";
import { eq } from "drizzle-orm";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";

export default function ListDeleteScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { mutate } = useMutation({
    mutationKey: ["delete-list", id],
    mutationFn: () => {
      return db.delete(lists).where(eq(lists.id, Number(id)));
    },
    onError: (error) => {
      console.log("Error:", error);
    },
  });

  useEffect(() => {
    mutate();
  }, []);

  return <Redirect href="/lists" />;
}
