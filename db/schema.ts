import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const lists = sqliteTable("lists", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name", { length: 50 }).notNull().unique(),
  items: text("items", { mode: "json" })
    .notNull()
    .$type<Item[]>()
    .default(sql`(json_array())`),
});

export type Item = {
  id?: number;
  name: string;
  taken: boolean;
};
