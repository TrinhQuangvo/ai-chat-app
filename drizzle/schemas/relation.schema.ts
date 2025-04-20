import { relations } from "drizzle-orm";
import { users } from "./users.schema";
import { rooms } from "./rooms.schema";
import { messages } from "./messages.schema";
import { bio } from "./bio.schema";

export const usersRelations = relations(users, ({ many }) => ({
  messages: many(messages),
}));

export const roomsRelations = relations(rooms, ({ many }) => ({
  messages: many(messages),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  user: one(users, {
    fields: [messages.userId],
    references: [users.id],
  }),
  room: one(rooms, {
    fields: [messages.roomId],
    references: [rooms.id],
  }),
}));

export const bioRelations = relations(bio, ({ one }) => ({
  user: one(users, {
    fields: [bio.userId],
    references: [users.id],
  }),
}));
