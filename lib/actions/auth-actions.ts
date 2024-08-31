"use server";
import User from "@/database/user.model";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { generateAuthToken } from "../generateAuthToken";
import { connectToDatabase } from "../mongoose";
const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};
const schemaRegister = z.object({
  username: z.string().min(3).max(20, {
    message: "Username must be between 3 and 20 characters",
  }),
  password: z.string().min(6).max(100, {
    message: "Password must be between 6 and 100 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  confirmPassword: z.string().min(6).max(100, {
    message: "Password must be between 6 and 100 characters",
  }),
});
export async function registerUserAction(prevState: any, formData: FormData) {
  const validatedFields: any = schemaRegister.safeParse({
    email: formData.get("email"),
    username: formData.get("name"),
    password: formData.get("password"),
    confirmPassword: formData.get("cnpassword"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Missing required fields",
    };
  }
  connectToDatabase();

  if (formData.get("password") !== formData.get("cnpassword")) {
    return {
      ...prevState,
      mismatcherror: "Passwords do not match",
    };
  }
  const user_details = {
    email: formData.get("email"),
    name: formData.get("name"),
    password: formData.get("password"),
  };
  const pass = user_details.password;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(pass ? pass.toString() : "", salt);

  const newUser = new User({
    email: formData.get("email"),
    name: formData.get("name"),
    password: hashedPassword,
  });

  await newUser.save();

  const userRegistered = await User.findOne({ email: formData.get("email") });

  cookies().set("jwt", generateAuthToken(userRegistered), config);
  redirect("/");
}

export async function OTPVerificationAction(formData: FormData) {
  console.log("Hello From OTP Verification Action");
  console.log(formData);

  return {
    data: formData,
  };
}
