import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Load environment variables
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "../.env.local") });

// Print connection URL for debugging (remove sensitive info)
const dbUrl = process.env.DATABASE_URL?.replace(/:.*@/, ":****@");
console.log("Attempting to connect to:", dbUrl);

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  log: ["query", "error", "warn"],
  __internal: {
    engine: {
      connectionTimeout: 10000, // 10 seconds
    },
  },
});

async function connectWithRetry(attempts = 5, delay = 3000) {
  for (let i = 0; i < attempts; i++) {
    try {
      console.log(`\nAttempt ${i + 1} of ${attempts} to connect...`);
      await prisma.$connect();
      console.log("✅ Database connection successful");

      // Test basic query
      console.log("\nTesting simple query...");
      const result = await prisma.user.findFirst();
      console.log("Query result:", result || "No users found");

      return true;
    } catch (error) {
      console.error(`\n❌ Attempt ${i + 1} failed:`, error.message);
      if (error.code) {
        console.error("Error code:", error.code);
      }
      if (i < attempts - 1) {
        console.log(`Waiting ${delay / 1000} seconds before retrying...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
  return false;
}

async function main() {
  try {
    const connected = await connectWithRetry();
    if (!connected) {
      console.error("\n❌ All connection attempts failed");
      process.exit(1);
    }
  } catch (error) {
    console.error("\n❌ Fatal error:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
