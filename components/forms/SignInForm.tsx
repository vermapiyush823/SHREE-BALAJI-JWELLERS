"use client";
import Logo from "@/assets/icons/logo.svg";
import { Eye, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
export default function SignInForm() {
  const [passwordShow, setPasswordShow] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-200 py-10 w-fit rounded-[25px]">
      <Image src={Logo} alt="logo" width={200} height={200} />
      <form className="p-6 w-[35vw] gap-y-4 flex flex-col justify-center  items-center">
        <div className="flex flex-col bg-white w-[100%] gap-1 p-3 rounded-[15px]">
          <label
            htmlFor="email"
            className="text-xl font-semibold text-gray-600"
          >
            Email
          </label>
          <div className="flex gap-1 items-center">
            <Mail size={16} className="text-gray-500" />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="username@xyz.com"
              required
              className="
              outline-none text-lg
              text-gray-500
              "
            />
          </div>
        </div>
        <div className="flex flex-col bg-white w-[100%] gap-1 p-3 rounded-[15px]">
          <label
            htmlFor="password"
            className="text-xl font-semibold text-gray-600"
          >
            Password
          </label>
          <div className="flex gap-1 items-center">
            <Eye
              size={16}
              className="text-gray-500 hover:text-gray-800"
              onClick={() => setPasswordShow(!passwordShow)}
            />
            <input
              type={passwordShow ? "text" : "password"}
              id="password"
              name="password"
              placeholder=".........."
              required
              className="
              outline-none text-lg
              text-gray-500
              placeholder:text-[30px]
              "
            />
          </div>
        </div>
        <button
          type="submit"
          className="border-gray-700 border-2 text-gray-700 text-lg font-semibold rounded-[15px] px-4 py-2 hover:bg-gray-700 hover:text-white w-full transition-all duration-200 ease-in-out"
        >
          Sign In
        </button>
      </form>
      <div className="flex gap-2 ">
        <p className="text-gray-600">Don't have an account?</p>
        <Link
          href="/sign-up"
          className="text-gray-700 font-semibold hover:text-gray-800"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
