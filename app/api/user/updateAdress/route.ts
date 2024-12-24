// /app/api/user/update/route.ts
import {
  addUserAddress,
  removeUserAddress,
  updateUserAddress,
} from "@/lib/actions/user.actions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, address, addresses, action } = await req.json();
  try {
    if (action === "add") {
      await addUserAddress(userId, address);
    } else if (action === "remove") {
      await removeUserAddress(userId, address);
    } else {
      await updateUserAddress(userId, addresses);
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
