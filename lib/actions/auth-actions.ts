"use server";
import User from "@/database/user.model";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import nodemailer from "nodemailer";
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
const schemaLogin = z.object({
  password: z.string().min(6).max(100, {
    message: "Password must be between 6 and 100 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
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
  const user = await User.findOne({ email: formData.get("email") });
  if (user) {
    return {
      ...prevState,
      mismatcherror: "User already exists",
    };
  }
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
  const hashedPassword = await bcrypt.hash(pass ? pass.toString() : "", 10);

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

export async function loginUserAction(prevState: any, formData: FormData) {
  const validatedFields: any = schemaLogin.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const user = await User.findOne({ email: validatedFields.data.email });
  if (!user) {
    return {
      ...prevState,
      message: "User not found",
    };
  }

  const validPass = await bcrypt.compare(
    validatedFields.data.password,
    user.password
  );
  if (!validPass) {
    return {
      ...prevState,
      message: "Invalid password",
    };
  }

  cookies().set("jwt", generateAuthToken(user), config);
  redirect("/");
}

export async function logoutUserAction() {
  cookies().set("jwt", "", {
    maxAge: 1,
  });
}

var OTP = "";
export async function sendEmail(email: string): Promise<boolean> {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  OTP = otp; // Make sure OTP is defined or managed correctly

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
      user: "vermapiyush823@gmail.com",
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: "vermapiyush@gmail.com",
    to: email,
    subject: "Your OTP Code",
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          color: #333333;
          margin: 0;
          padding: 20px;
        }
        .container {
          background-color: #ffffff;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #4CAF50;
        }
        p {
          font-size: 16px;
        }
        .otp {
          font-size: 24px;
          font-weight: bold;
          background-color: #4CAF50;
          color: #ffffff;
          padding: 10px;
          border-radius: 5px;
          text-align: center;
          letter-spacing: 5px;
          margin: 20px 0;
        }
        .footer {
          font-size: 14px;
          color: #888888;
          text-align: center;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Your OTP Code</h1>
        <p>Hello,</p>
        <p>Thank you for using our service. Please use the following OTP to complete your process:</p>
        <div class="otp">${otp}</div>
        <p>If you did not request this, please ignore this email.</p>
        <p>Best regards,<br/>Shree Balaji Jwellers</p>
      </div>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} Shree Balaji Jwellers. All rights reserved.</p>
      </div>
    </body>
    </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}

export async function verifyOTP(otp: string) {
  console.log(OTP);
  console.log(otp);
  if (OTP == otp) {
    console.log("OTP Verified");
    return true;
  }
  return false;
}
