import { Document, model, models, Schema } from "mongoose";

export interface ProductModel extends Document {
  title: string;
  price: number;
  image: string;
  type: string;
  subType: string;
  weight: number;
  purity: number;
  review: number;
  rating: number;
}
const ProductSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  type: { type: String, required: true },
  subType: { type: String, required: true },
  weight: { type: Number, required: true },
  purity: { type: Number, required: false },
  review: { type: Number, required: false, default: 0 },
  rating: { type: Number, required: false, default: 0 },
});

const Product = models.Product || model("Product", ProductSchema);

export default Product;
