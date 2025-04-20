import { Role } from "@/drizzle/schemas";
import { randomUUID } from "crypto";

export const USERS = [
  {
    id: randomUUID(),
    username: "admin",
    password: "123456",
    role: "admin",
    bio: {
      firstName: "admin",
      lastName: "",
      backupEmail: "",
      phoneNumber: "",
      address: "",
    },
  },
  {
    id: randomUUID(),
    username: "guest",
    password: "123456",
    role: "user",
    bio: {
      firstName: "guest",
      lastName: "",
      backupEmail: "",
      phoneNumber: "",
      address: "",
    },
  },
  {
    id: randomUUID(),
    username: "bot",
    password: "123456",
    role: "bot",
    bio: {
      firstName: "bot",
      lastName: "",
      backupEmail: "",
      phoneNumber: "",
      address: "",
    },
  },
];
export const ROOMS = [
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

export const ROLES: Role[] = [
  { id: randomUUID(), name: "admin", createdAt: new Date() },
  { id: randomUUID(), name: "user", createdAt: new Date() },
  { id: randomUUID(), name: "bot", createdAt: new Date() },
];
