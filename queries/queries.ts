import { db } from "@/db";
import { lists } from "@/db/schema";
import { useQuery } from "@tanstack/react-query";
import { eq } from "drizzle-orm";

export const useGetListById = (id: number) =>
  useQuery({
    queryKey: ["list", id],
    queryFn: () => {
      return db
        .select()
        .from(lists)
        .where(eq(lists.id, Number(id)));
    },
  });
