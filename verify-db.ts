import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { db } from "./lib/db";
import { geologicalUnits } from "./lib/db/schema";
import { count } from "drizzle-orm";

async function verify() {
  try {
    const [result] = await db.select({ value: count() }).from(geologicalUnits);
    console.log(`Connection successful. Total units in database: ${result.value}`);
    
    if (result.value > 0) {
      const units = await db.select().from(geologicalUnits).limit(5);
      console.log("Sample units:", JSON.stringify(units, null, 2));
    }
  } catch (error) {
    console.error("Verification failed:", error);
  }
  process.exit(0);
}

verify();
