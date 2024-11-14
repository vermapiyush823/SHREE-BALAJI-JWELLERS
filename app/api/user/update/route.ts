// /app/api/user/update/route.ts
import { updateUserPersonalInfo } from "@/lib/actions/user.actions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, name, gender, email, phone } = await req.json();

  try {
    await updateUserPersonalInfo(userId, name, gender, email, phone);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
