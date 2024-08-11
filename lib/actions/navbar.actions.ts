"use server";
import Navbar from "../../database/navbar.model";
import { connectToDatabase } from "../mongoose";
export async function getNavbarDropdowns() {
  await connectToDatabase();
  const quickLinks = await Navbar.find({});
  return quickLinks;
}
