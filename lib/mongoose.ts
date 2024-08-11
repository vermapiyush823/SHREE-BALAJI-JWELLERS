import mongoose from "mongoose";

let isConnected: boolean = false;

export async function connectToDatabase() {
  mongoose.set("strictQuery", true);
  if (!process.env.DATABASE_URL) {
    throw new Error("Missing MONGODB_URL");
  }
  if (isConnected) {
    return console.log("Mongodatabase is already connected");
  }
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      dbName: "shreeBalajiJwellers",
    });
    isConnected = true;
    console.log("Mongodatabase connected");
  } catch (error) {
    console.log(error);
    console.log("Mongodatabase connection failed");
  }
}
