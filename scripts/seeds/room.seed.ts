import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { Pool } from "pg";
import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { rooms } from "../../drizzle/schemas";
import * as schemas from "../../drizzle/schemas";

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

  const roomList = [
    {
      id: randomUUID(),
      name: "General Chat 🧃",
      createdAt: new Date(),
    },
    {
      id: randomUUID(),
      name: "Fun Zone 🍿",
      createdAt: new Date(),
    },
    {
      id: randomUUID(),
      name: "Random Not Safe For Work 😭",
      createdAt: new Date(),
    },
  ];

  try {
    for (const room of roomList) {
      if (await roomExists(db, room.name)) {
        console.log(`⚠️ Room '${room.name}' đã tồn tại. Bỏ qua.`);
        continue;
      }

      await db.insert(rooms).values(room);
      console.log(`✅ Tạo room '${room.name}' thành công.`);
    }

    return roomList;
  } catch (err) {
    console.error("❌ Lỗi khi seed room:", err);
  } finally {
    await client.end();
  }
}
