import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { email, pdf, title } = await req.json();

  if (!email || !pdf) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  await resend.emails.send({
    // just a test email
    from: "onboarding@resend.dev",
    to: email,
    subject: `Invoice for ${title}`,
    text: `Please find attached your invoice for ${title}.`,
    attachments: [
      {
        filename: `${title}-invoice.pdf`,
        content: pdf, // base64 string
      },
    ],
  });

  return NextResponse.json({ success: true });
}
