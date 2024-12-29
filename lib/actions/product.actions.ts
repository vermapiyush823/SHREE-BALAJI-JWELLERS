import Product from "@/database/product.model";
import { connectToDatabase } from "../mongoose";

interface FilterOptions {
  price?: string[];
  category?: string[];
  metalType?: string[];
}

export async function getAllProducts(filters?: FilterOptions) {
  await connectToDatabase();
  const query: any = {};

  if (filters) {
    if (filters.category?.length) {
      query.subType = { $in: filters.category };
    }
    if (filters.metalType?.length) {
      query.type = { $in: filters.metalType };
    }
    if (filters.price?.length) {
      const priceQueries = filters.price.map((range) => {
        if (range.includes("+")) {
          // Handle cases like "100000+"
          const minPrice = parseInt(range.replace("+", ""));
          return { price: { $gte: minPrice } };
        } else {
          // Handle range cases like "0-10000"
          const [min, max] = range.split("-").map((num) => parseInt(num));
          return {
            price: {
              $gte: min || 0,
              $lte: max || Number.MAX_SAFE_INTEGER,
            },
          };
        }
      });

      if (priceQueries.length > 0) {
        query.$or = priceQueries;
      }
    }
  }

  try {
    const products = await Product.find(query);
    return products;
  } catch (error) {
    console.error("Error in getAllProducts:", error);
    throw error;
  }
}

export async function getProductById(id: string) {
  await connectToDatabase();
  const product = await Product.findById(id);
  return product;
}
