// drizzle/schema.ts
import {
    pgTable,
    serial,
    text,
    timestamp,
    integer,
    varchar,
  } from "drizzle-orm/pg-core";
  import { relations } from "drizzle-orm";
  
  export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    username: varchar("username", { length: 100 }).notNull().unique(),
    createdAt: timestamp("created_at").defaultNow(),
  });
  
  export const rooms = pgTable("rooms", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull().unique(),
    createdAt: timestamp("created_at").defaultNow(),
  });
  
  export const messages = pgTable("messages", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(() => users.id),
    roomId: integer("room_id").notNull().references(() => rooms.id),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  });
  
  // (Optional) Khai báo quan hệ cho Drizzle relations API (nếu dùng)
  export const usersRelations = relations(users, ({ many }) => ({
    messages: many(messages),
  }));
  
  export const roomsRelations = relations(rooms, ({ many }) => ({
    messages: many(messages),
  }));
  
  export const messagesRelations = relations(messages, ({ one }) => ({
    user: one(users, { fields: [messages.userId], references: [users.id] }),
    room: one(rooms, { fields: [messages.roomId], references: [rooms.id] }),
  }));
  