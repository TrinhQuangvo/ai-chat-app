import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { rooms } from "./rooms.schema";
import { users } from "./users.schema";

export const messages = pgTable("messages", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid("user_id").notNull().references(() => users.id),
  roomId: uuid("room_id").notNull().references(() => rooms.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
