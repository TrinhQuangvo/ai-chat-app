import { sql } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { rooms } from "./rooms.schema";
import { users } from "./users.schema";

export const roomUsers = pgTable("room_users", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid("user_id").notNull().references(() => users.id),
  roomId: uuid("room_id").notNull().references(() => rooms.id),
  joinedAt: timestamp("joined_at").defaultNow(),
});

export type RoomUser = typeof roomUsers.$inferSelect;
