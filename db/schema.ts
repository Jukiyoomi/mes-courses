import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const lists = sqliteTable("lists", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name", { length: 50 }).notNull().unique(),
  isGlobal: integer("is_global", { mode: "boolean" }).notNull().default(false),
  items: text("items")
    .notNull()
    .$defaultFn(() => ""),
});
