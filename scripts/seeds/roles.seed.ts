import { randomUUID } from "crypto";
import dotenv from "dotenv";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schemas from "../../drizzle/schemas";
import { Role, roles } from "../../drizzle/schemas";

dotenv.config();

const getDatabaseClient = (): Pool => {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL not found in .env");
  }
  return new Pool({ connectionString: databaseUrl });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const roleExists = async (db: any, name: string) => {
  return await db.query.roles.findFirst({
    where: eq(roles.name, name),
  });
};
export async function seedRoles() {
  const ROLES: Role[] = [
    { id: randomUUID(), name: "admin", createdAt: new Date() },
    { id: randomUUID(), name: "user", createdAt: new Date() },
    { id: randomUUID(), name: "bot", createdAt: new Date() },
  ] as Role[];

  const client = getDatabaseClient();
  const db = drizzle(client, { schema: schemas });

  try {
    for (const role of ROLES) {
      if (await roleExists(db, role.name)) {
        console.log(`👤 Role '${role.name}' đã tồn tại. Bỏ qua.`);
        continue;
      }

      await db.insert(roles).values(role);
      console.log(`✅ Tạo role '${role.name}' thành công.`);
    }
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    client.end();
  }
}
