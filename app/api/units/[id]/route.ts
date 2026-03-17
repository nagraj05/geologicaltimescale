import { db } from "@/lib/db";
import { geologicalUnits } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const [unit] = await db.select().from(geologicalUnits).where(eq(geologicalUnits.id, id));
    
    if (!unit) {
      return NextResponse.json({ error: "Unit not found" }, { status: 404 });
    }

    return NextResponse.json(unit);
  } catch (error) {
    console.error("Failed to fetch unit details:", error);
    return NextResponse.json({ error: "Failed to fetch unit details" }, { status: 500 });
  }
}
