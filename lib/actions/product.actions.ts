import Product from "@/database/product.model";
import { connectToDatabase } from "../mongoose";
export async function getAllProducts() {
  await connectToDatabase();
  const products = await Product.find({});
  return products;
}
