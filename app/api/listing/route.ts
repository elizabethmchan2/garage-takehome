import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const uuid = req.nextUrl.searchParams.get("listing_id");

  if (!uuid) {
    return NextResponse.json({ error: "Missing listing_id" }, { status: 400 });
  }

  const res = await fetch(
    `https://garage-backend.onrender.com/listings/${uuid}`
  );
  const data = await res.json();

  return NextResponse.json(data);
}
