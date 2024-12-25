import { sendEmail } from "@/lib/actions/email.actions";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const otp = await sendEmail(email);
    const tokenId = await bcrypt.hash(otp, 10);
    return NextResponse.json({
      message: "OTP sent successfully",
      ok: true,
      status: 200,
      tokenId,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
