import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const uuid = req.nextUrl.searchParams.get("listing_id");

    if (!uuid) {
      return NextResponse.json(
        { error: "Missing listing_id" },
        { status: 400 }
      );
    }

    const res = await fetch(
      `https://garage-backend.onrender.com/listings/${uuid}`
    );

    if (!res.ok) {
      const text = await res.text(); // safer than json if error
      console.error("BACKEND ERROR:", res.status, text);

      return NextResponse.json(
        {
          error: "Failed to fetch listing",
          status: res.status,
        },
        { status: res.status }
      );
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (err: unknown) {
    console.error("API ROUTE ERROR:", err);

    const message =
      err instanceof Error
        ? err.message
        : typeof err === "object" && err !== null && "message" in err
        ? String((err as { message: unknown }).message)
        : "Unknown error";

    return NextResponse.json(
      {
        error: "Internal server error",
        message,
      },
      { status: 500 }
    );
  }
}
