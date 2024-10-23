import { db } from "@/db";
import { lists } from "@/db/schema";
import { model } from "@/lib/classify";
import { classifyListItemsSchema } from "@/lib/schemas/list";
import { useQuery } from "@tanstack/react-query";
import { eq } from "drizzle-orm";

export const useClassify = (id: number, items: string) => {
  return useQuery({
    queryKey: ["classifies", id],
    queryFn: async () => {
      if (items === "") return "";
      const predefined = ["menage", "cuisine", "douche", "lessive"];
      const prompt = `classe ces éléments selon des types préféfinis que je vais te donner. je veux un retour string qui contiendra le type prédefini et ses éléments classifiés et sera formatté de cette façon : type1: elem1, elem2; type2, elem1, elem2. les types prédéfinis : ${predefined.join(", ")}. Les éléments à classer : ${items}. Répond juste avec la classification, ne mets rien d'autre dans ta réponse.`;
      // console.log("Submitted Data:", prompt);
      const { response } = await model.generateContent(prompt);
      console.log("Response:", response.text());
      const parsed = classifyListItemsSchema.parse(response.text());
      return parsed;
    },
    enabled: false,
  });
};

export const useGetListById = (id: number) =>
  useQuery({
    queryKey: ["list", id],
    queryFn: async () => {
      const found = await db
        .select()
        .from(lists)
        .where(eq(lists.id, Number(id)))
        .limit(1);
      return found[0];
    },
  });
