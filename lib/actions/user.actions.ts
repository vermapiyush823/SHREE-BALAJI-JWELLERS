import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";

export async function getAllUsers() {
  await connectToDatabase();
  const users = await User.find({});
  users.map((user) => {
    user._id = user._id.toString();
  });
  return users;
}

export async function getUserById(id: String) {
  await connectToDatabase();
  const user = await User.findOne({ _id: id });
  return JSON.parse(JSON.stringify(user));
}
