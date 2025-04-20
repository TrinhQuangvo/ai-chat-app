import { relations } from "drizzle-orm";
import { bio } from "./bio.schema";
import { messages } from "./messages.schema";
import { roles } from "./roles.schema";
import { rooms } from "./rooms.schema";
import { users } from "./users.schema";
import { roomUsers } from "./room_users.schema";

export const usersRelations = relations(users, ({ many, one }) => ({
  messages: many(messages),
  role: one(roles, {
    fields: [users.roleId],
    references: [roles.id],
  }),
  bio: one(bio, {
    fields: [users.bioId],
    references: [bio.id],
  }),
  roomUsers: many(roomUsers),
}));

export const roomsRelations = relations(rooms, ({ many }) => ({
  messages: many(messages),
  roomUsers: many(roomUsers),
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

export const roomMembersRelations = relations(roomUsers, ({ one }) => ({
  user: one(users, {
    fields: [roomUsers.userId],
    references: [users.id],
  }),
  room: one(rooms, {
    fields: [roomUsers.roomId],
    references: [rooms.id],
  }),
}));
