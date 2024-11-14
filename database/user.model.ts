import { Document, model, models, Schema } from "mongoose";

export interface UserModel extends Document {
  email: string;
  password: string;
  name: string;
  phone: string;
  gender: string;
  imgURL: string;
  imgType: string;
  addresses: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    label: string;
    phoneNumber: string;
  }[];
  orders: {
    orderId: Schema.Types.ObjectId;
    status: string;
    totalAmount: number;
    date: Date;
  }[];
  wishlist: Schema.Types.ObjectId[];
  cart: {
    productId: Schema.Types.ObjectId;
    quantity: number;
    addedAt: Date;
  }[];
  lastLogin: Date;
  isVerified: boolean;
  resetPasswordToken: string;
  resetPasswordExpiresAt: Date;
  verificationToken: String;
  verificationTokenExpiresAt: Date;
}

// Defining the User schema
const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
      default: "",
    },
    imgURL: {
      type: String,
      default: null,
      required: false,
    },
    imgType: {
      type: String,
      default: "",
      required: false,
    },
    gender: {
      type: String,
      required: false,
      default: "",
    },
    addresses: [
      {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        postalCode: { type: String, required: true },
        label: { type: String, required: true },
        phoneNumber: { type: String, required: true },
      },
    ],
    orders: [
      {
        orderId: { type: Schema.Types.ObjectId, ref: "Order" },
        status: { type: String, required: true },
        totalAmount: { type: Number, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    cart: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true },
        addedAt: { type: Date, default: Date.now },
      },
    ],
    comments: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        comment: { type: String, required: true },
        rating: { type: Number, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    ordersHistory: [
      {
        orderId: { type: Schema.Types.ObjectId, ref: "Order" },
        status: { type: String, required: true },
        totalAmount: { type: Number, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = models.User || model<UserModel>("User", UserSchema);

export default User;
