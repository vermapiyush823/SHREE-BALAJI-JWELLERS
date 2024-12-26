import Product from "@/database/product.model";
import { connectToDatabase } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";

// Define interface for product data
interface ProductData {
  title: FormDataEntryValue | null;
  price: number;
  image: FormDataEntryValue | string[] | null;
  type: FormDataEntryValue | null;
  subType: FormDataEntryValue | null;
  weight: number;
  purity?: number;
  gender: FormDataEntryValue | null;
  stone?: boolean;
  stoneWeight?: number;
  stonePurity?: number;
  stoneType?: FormDataEntryValue | null;
  stonePrice?: number;
  stoneQuantity?: number;
  noOfReview: number;
  rating: number;
  reviews: never[];
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const formData = await req.formData();

    const productData: ProductData = {
      title: formData.get("title"),
      price: Number(formData.get("price")),
      image: JSON.parse(formData.get("images") as string),
      type: formData.get("type"),
      subType: formData.get("subType"),
      weight: Number(formData.get("weight")),
      purity: Number(formData.get("purity")) || undefined,
      gender: formData.get("gender"),
      noOfReview: 0,
      rating: 0,
      reviews: [],
    };

    // Add stone details if stone is true
    if (formData.get("stone") === "true") {
      productData.stone = true;
      productData.stoneWeight =
        Number(formData.get("stoneWeight")) || undefined;
      productData.stonePurity =
        Number(formData.get("stonePurity")) || undefined;
      productData.stoneType = formData.get("stoneType");
      productData.stonePrice = Number(formData.get("stonePrice")) || undefined;
      productData.stoneQuantity =
        Number(formData.get("stoneQuantity")) || undefined;
    }

    // Validate required fields
    const requiredFields = ["title", "type", "subType", "gender"] as const;
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

    // Handle image processing
    if (typeof productData.image === "string") {
      const imageArray = productData.image.split("data:image/");
      imageArray.shift();
      const processedImages = imageArray.map(
        (img, index) => `data:image/${index === 0 ? img.slice(0, -1) : img}`
      );
      productData.image = processedImages;
    }

    // Create new product
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
