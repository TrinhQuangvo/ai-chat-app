import { ROOMS } from "@/constants/seed.constant";
import dotenv from "dotenv";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schemas from "../../drizzle/schemas";
import { rooms } from "../../drizzle/schemas";

dotenv.config();

const getDatabaseClient = (): Pool => {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("❌ DATABASE_URL not found in .env");
  }
  return new Pool({ connectionString: databaseUrl });
};

const roomExists = async (db: ReturnType<typeof drizzle>, name: string) => {
  const result = await db.select().from(rooms).where(eq(rooms.name, name));
  return result.length > 0;
};

export async function seedRooms() {
  const client = getDatabaseClient();
  const db = drizzle(client, { schema: schemas });

  try {
    for (const room of ROOMS) {
      if (await roomExists(db, room.name)) {
        console.log(`⚠️ Room '${room.name}' đã tồn tại. Bỏ qua.`);
        continue;
      }

      await db.insert(rooms).values(room);
      console.log(`✅ Tạo room '${room.name}' thành công.`);
    }

    return ROOMS;
  } catch (err) {
    console.error("❌ Lỗi khi seed room:", err);
  } finally {
    await client.end();
  }
}
