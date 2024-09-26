import { Document, model, models, Schema } from "mongoose";

// Defining the interface for TypeScript
export interface UserModel extends Document {
  email: string;
  password: string;
  name: string; // Keeping name as a single string
  phone: string;
  addresses: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    label: string; // e.g., "Home", "Work"
    phoneNumber: string; // Adding phone number to address
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
  verificationToken: string;
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
      required: true, // Name is a single string field
    },
    phone: {
      type: String,
      required: false,
    },
    addresses: [
      {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        postalCode: { type: String, required: true },
        label: { type: String, required: true }, // e.g., "Home", "Work"
        phoneNumber: { type: String, required: true }, // Phone number for each address
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

// Using models to prevent overwriting the model during hot reloading in development
const User = models.User || model<UserModel>("User", UserSchema);

export default User;
