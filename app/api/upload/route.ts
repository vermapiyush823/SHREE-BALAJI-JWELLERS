import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as Blob;
    const type = formData.get("type") as string;

    // Convert file to base64
    const buffer = Buffer.from(await file.arrayBuffer());
    const imageUrl = `data:${type};base64,${buffer.toString("base64")}`;

    return NextResponse.json({
      message: "Image uploaded successfully",
      imageUrl,
    });
  } catch (error) {
    console.error("Failed to upload image:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
