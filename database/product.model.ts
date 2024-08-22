import { Document, model, models, Schema } from "mongoose";

export interface ProductModel extends Document {
  title: string;
  price: number;
  image: string[];
  type: string;
  subType: string;
  weight: number;
  purity?: number;
  noOfReview: number;
  rating: number;
  stone?: boolean;
  stoneWeight?: number;
  stonePurity?: number;
  stoneType?: string;
  stonePrice?: number;
  gender: string;
  stoneQuantity?: number;
  reviews: Array<object>;
}
const ProductSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true },
  type: { type: String, required: true },
  subType: { type: String, required: true },
  weight: { type: Number, required: true },
  purity: { type: Number, required: false },
  noOfReview: { type: Number, required: false, default: 0 },
  rating: { type: Number, required: false, default: 0 },
  stone: { type: Boolean, required: false, default: false },
  stoneWeight: { type: Number, required: false },
  stonePurity: { type: Number, required: false },
  stoneType: { type: String, required: false },
  stonePrice: { type: Number, required: false },
  stoneQuantity: { type: Number, required: false },
  gender: { type: String, required: true },
  reviews: { type: Array, required: false },
});

const Product = models.Product || model("Product", ProductSchema);

export default Product;
