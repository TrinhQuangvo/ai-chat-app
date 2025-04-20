import { seedRoles } from "./roles.seed";
import { seedRooms } from "./room.seed";
import { seedUsers } from "./user.seed";

async function startSeeding() {
  try {
    console.log("🌱 Running seeds...");

    await seedRoles();
    await seedUsers();
    await seedRooms();
    // await seedMessages();

    console.log("✅ Seeding completed.");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    process.exit(0);
  }
}

startSeeding();
