import { sql } from "drizzle-orm"; 
import { db } from "../lib/db";

async function reset() {
  await db.execute(sql.raw("DROP SCHEMA public CASCADE;"));
  await db.execute(sql.raw("CREATE SCHEMA public;"));
  await db.execute(sql.raw("CREATE EXTENSION IF NOT EXISTS \"pgcrypto\";"));
  await db.execute(sql.raw("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";"));
  console.log("🔥 DB reset xong.");
  process.exit(0);
}

reset().catch((err) => {
  console.error("❌ Reset lỗi:", err);
  process.exit(1);
});
