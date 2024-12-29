import { getAllProducts } from "@/lib/actions/product.actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const filters = searchParams.get("filters")
      ? JSON.parse(searchParams.get("filters")!)
      : undefined;

    console.log(filters);

    const products = await getAllProducts(filters);
    return NextResponse.json({ products });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
