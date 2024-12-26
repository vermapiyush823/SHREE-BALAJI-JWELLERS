import Product from "@/database/product.model";
import { connectToDatabase } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const formData = await req.formData();

    // Log the received data for debugging
    // console.log("Received form data:", Object.fromEntries(formData.entries()));

    const productData = {
      title: formData.get("title"),
      price: Number(formData.get("price")),
      image: formData.get("images"),
      type: formData.get("type"),
      subType: formData.get("subType"),
      weight: Number(formData.get("weight")),
      purity: Number(formData.get("purity")) || undefined,
      gender: formData.get("gender"),
      ...(formData.get("stone") === "true" && {
        stone: true,
        stoneWeight: Number(formData.get("stoneWeight")) || undefined,
        stonePurity: Number(formData.get("stonePurity")) || undefined,
        stoneType: formData.get("stoneType") || undefined,
        stonePrice: Number(formData.get("stonePrice")) || undefined,
        stoneQuantity: Number(formData.get("stoneQuantity")) || undefined,
      }),
      noOfReview: 0,
      rating: 0,
      reviews: [],
    };

    // Validate required fields
    const requiredFields = ["title", "type", "subType", "gender"];
    for (const field of requiredFields) {
      if (!productData[field]) {
        return NextResponse.json(
          {
            error: `Missing required field: ${field}`,
          },
          { status: 400 }
        );
      }
    }

    productData.image = productData.image.split("data:image/");
    productData.image.shift();
    productData.image[0] = productData.image[0].slice(0, -1);
    productData.image = productData.image.map((img) => `data:image/${img}`);

    // productData.images is string which contains an array of image URLs
    // Convert it to an actual array of URLs
    const newProduct = await Product.create(productData);
    console.log("Product data:", productData.image);
    return NextResponse.json(
      {
        message: "Product created successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Failed to create product:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to create product",
      },
      { status: 500 }
    );
  }
}
