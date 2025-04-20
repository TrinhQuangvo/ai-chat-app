import { db } from "../../lib/db";
import { messages, rooms, users } from "../../drizzle/schemas";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";

async function getUser(username: string) {
  const userData = await db.select().from(users).where(eq(users.username, username));
  return userData[0].id;
}

async function getRoom(name: string) {
  const roomData = await db.select().from(rooms).where(eq(rooms.name, name));
  return roomData[0].id;
}

export async function seedMessages() {
  
  const messageList = [
    {
      id: randomUUID(),
      userId: await getUser("admin"),
      roomId: await getRoom("general"),
      content: "👋 Xin chào mọi người! Đây là admin.",
    },
    {
      id: randomUUID(),
      userId: await getUser("guest"),
      roomId: await getRoom("general"),
      content: "Hi, tôi là guest. Vào chơi nè!",
    },
    {
      id: randomUUID(),
      userId: await getUser("bot"),
      roomId: await getRoom("general"),
      content: "🤖 Tôi là bot của hệ thống. Hãy hỏi gì đó đi!",
    },
    {
      id: randomUUID(),
      userId: await getUser("guest"),
      roomId: await getRoom("general"),
      content: "Room này có vẻ thú vị ghê 😄",
    },
  ];

  await db.insert(messages).values(messageList);

  console.log("✉️ Seeded messages.");
}
