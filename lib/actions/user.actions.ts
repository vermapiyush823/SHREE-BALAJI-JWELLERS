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

export async function updateUserPersonalInfo(
  id: string,
  name: string,
  gender: string,
  email: string,
  phone: string
) {
  await connectToDatabase();
  try {
    const user = await User.findById(id); // Find user by ID
    if (!user) {
      throw new Error("User not found");
    }
    user.name = name;
    user.gender = gender;
    user.email = email;
    user.phone = phone;
    // append a new address to the user's addresses array
    user.addresses.push({
      street: "2nd Street",
      city: "New York",
      state: "NY",
      country: "USA",
      postalCode: "10001",
      label: "Home",
      phoneNumber: "1234567890",
    });
    const updatedUser = await user.save();
    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

export async function updateUserProfilePicture(
  id: string,
  buffer: Buffer,
  type: string
) {
  try {
    await connectToDatabase();
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    user.imgURL = `data:${type};base64,${Buffer.from(buffer).toString(
      "base64"
    )}`;
    user.imgType = type;
    await user.save();
  } catch (error) {
    console.error("Error updating profile picture:", error);
  }
}
