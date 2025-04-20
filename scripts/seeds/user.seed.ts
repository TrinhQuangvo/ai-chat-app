import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import dotenv from "dotenv";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schemas from "../../drizzle/schemas";
import { roles, users } from "../../drizzle/schemas";

dotenv.config({ path: "./.env" });

// Seed data
const USERS = [
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

// Setup DB client
const getDatabaseClient = (): Pool => {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("❌ DATABASE_URL not found in .env");
  }
  return new Pool({ connectionString: databaseUrl });
};

// Check if user exists
async function userExists(db: ReturnType<typeof drizzle>, username: string) {
  const result = await db.select().from(users).where(eq(users.username, username));
  return result.length > 0;
}

// Get role by name
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getRole(db: any, name: string) {
  const result = await db.select().from(roles).where(eq(roles.name, name));
  if (result.length === 0) {
    throw new Error(`❌ Role '${name}' not found in DB`);
  }
  return result[0].id;
}


// Create user
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function createUser(db: any, user: any, roleId: string) {
  const hashedPassword = await bcrypt.hash(user.password, 10);

  const [createdUser] = await db.insert(users).values({
    id: user.id,
    username: user.username,
    password: hashedPassword,
    roleId, 
  }).returning();

  return createdUser;
}

// Seed users
export async function seedUsers() {
  const client = getDatabaseClient();
  const db = drizzle(client, { schema: schemas });

  try {
    for (const user of USERS) {
      const exists = await userExists(db, user.username);
      if (exists) {
        console.log(`👤 User '${user.username}' đã tồn tại. Bỏ qua.`);
        continue;
      }

      const roleId = await getRole(db, user.role);
      await createUser(db, user, roleId);

      console.log(`✅ Tạo user '${user.username}' thành công.`);
    }
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    throw err;
  } finally {
    await client.end();
  }
}
