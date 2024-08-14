import Product from "@/database/product.model";
import { connectToDatabase } from "../mongoose";
export async function getAllProducts() {
  await connectToDatabase();
  const products = await Product.find({});
  products.map((product) => {
    product._id = product._id.toString();
  });
  return products;
}

export async function getProductById(id: string) {
  await connectToDatabase();
  const product = await Product.findOne({ _id: id });
  return product;
}
