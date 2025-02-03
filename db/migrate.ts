import { drizzle, type SQLJsDatabase } from "drizzle-orm/sql-js";
import initSqlJs from "sql.js";
import fs from "node:fs";
import path from "node:path";

import { migrate } from "drizzle-orm/sql-js/migrator";

export let db: SQLJsDatabase;

const pathToDatabase = path.resolve(".", "public/database.sqlite");

const run = async () => {
  const filebuffer = fs.readFileSync(pathToDatabase);
  const SQL = await initSqlJs();
  const sqldb = new SQL.Database(filebuffer);
  db = drizzle(sqldb);

  migrate(db, { migrationsFolder: path.resolve(".", "db/migrations") });

  const data = sqldb.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(pathToDatabase, buffer);
};
run().catch(console.log);
