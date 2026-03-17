import { db } from "@/lib/db";
import { geologicalUnits } from "@/lib/db/schema";
import { eq, isNull } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const parentId = searchParams.get("parentId");

    const units = await db
      .select()
      .from(geologicalUnits)
      .where(
        parentId
          ? eq(geologicalUnits.parentId, parentId)
          : isNull(geologicalUnits.parentId)
      )
      .orderBy(geologicalUnits.orderIndex);

    return NextResponse.json(units);
  } catch (error) {
    console.error("❌ ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch units", details: String(error) },
      { status: 500 }
    );
  }
}