import { Document, model, models, Schema } from "mongoose";

export interface OrderModel extends Document {
  userId: Schema.Types.ObjectId;
  products: {
    productId: Schema.Types.ObjectId;
    quantity: number;
  }[];
  status: string;
  totalAmount: number;
  date: Date;
}

const OrderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  status: {
    type: String,
    required: true,
    default: "Pending",
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Order = models.Order || model<OrderModel>("Order", OrderSchema);

export default Order;
