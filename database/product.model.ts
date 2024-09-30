import { Document, model, models, Schema } from "mongoose";

// Define an interface for the Review object
interface Review {
  userId: Schema.Types.ObjectId;
  comment: string;
  rating: number; // rating given in the review
  createdAt: Date;
}

// Define the interface for Product
export interface ProductModel extends Document {
  title: string;
  price: number;
  image: string[]; // Array of image URLs
  type: string; // e.g., Jewelry
  subType: string; // e.g., Ring, Necklace
  weight: number; // in grams
  purity?: number; // e.g., Gold purity percentage (optional)
  noOfReviews: number; // Count of reviews
  rating: number; // Average rating
  stone?: boolean; // Whether the item has a stone (optional)
  stoneWeight?: number; // Stone weight (optional)
  stonePurity?: number; // Purity of the stone (optional)
  stoneType?: string; // Type of stone (optional)
  stonePrice?: number; // Price of the stone (optional)
  gender: string; // e.g., "Men", "Women", "Unisex"
  stoneQuantity?: number; // Quantity of stones (optional)
  reviews: Review[]; // Array of review objects
}

// Define the product schema
const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    image: [{ type: String, required: true }], // Array of image URLs
    type: { type: String, required: true }, // e.g., Jewelry
    subType: { type: String, required: true }, // e.g., Ring, Necklace
    weight: { type: Number, required: true }, // e.g., Weight in grams
    purity: { type: Number }, // Purity of the material (optional)
    noOfReviews: { type: Number, default: 0 }, // Default to 0 reviews
    rating: { type: Number, default: 0 }, // Default to 0 rating
    stone: { type: Boolean, default: false }, // Default to no stone
    stoneWeight: { type: Number }, // Weight of stone (optional)
    stonePurity: { type: Number }, // Purity of stone (optional)
    stoneType: { type: String }, // Type of stone (optional)
    stonePrice: { type: Number }, // Price of stone (optional)
    stoneQuantity: { type: Number }, // Number of stones (optional)
    gender: { type: String, required: true }, // Gender category
    reviews: [
      {
        username: { type: String, required: true }, // Reviewer username
        comment: { type: String, required: true }, // Review comment
        createdAt: { type: Date, default: Date.now }, // Date of the review
        rating: { type: Number, required: true }, // Rating given in the review
        imgUrl: { type: String }, // Reviewer image
      },
    ],
  },
  { timestamps: true }
);

const Product = models.Product || model<ProductModel>("Product", ProductSchema);

export default Product;
