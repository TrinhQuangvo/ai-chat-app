import { pgTable, timestamp, uuid, text, varchar } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const bio = pgTable("bio", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  description: text("bio").notNull(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  backupEmail: varchar("backup_email", { length: 100 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 100 }).notNull(),
  address: varchar("address", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Bio = typeof bio.$inferSelect;