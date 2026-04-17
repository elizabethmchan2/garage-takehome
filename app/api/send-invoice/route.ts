import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email, pdf, title } = await req.json();

    if (!email || !pdf) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: `${title}`,
      text: `Please find attached your invoice for ${title}.`,
      attachments: [
        {
          filename: `${title}-invoice.pdf`,
          content: pdf,
        },
      ],
    });

    return NextResponse.json({ success: true, result });
  } catch (err: unknown) {
    console.error("EMAIL SEND ERROR:", err);

    const message =
      err instanceof Error
        ? err.message
        : typeof err === "object" && err !== null && "message" in err
        ? String((err as { message: unknown }).message)
        : "Unknown error";

    return NextResponse.json(
      {
        error: "Failed to send email",
        message,
      },
      { status: 500 }
    );
  }
}
