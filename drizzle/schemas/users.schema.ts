import { pgTable, varchar, timestamp, uuid } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { roles } from "./roles.schema";
import { bio } from "./bio.schema";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  username: varchar("username", { length: 100 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  roleId: uuid("role_id").notNull().references(() => roles.id), 
  bioId: uuid("bio_id").references(() => bio.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export type User = typeof users.$inferSelect;
