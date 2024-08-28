"use client";
import Logo from "@/assets/icons/logo.svg";
import { Eye, Mail, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
export default function SignUpForm() {
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
            htmlFor="username"
            className="text-xl font-semibold text-gray-600"
          >
            Username
          </label>
          <div className="flex gap-1 items-center">
            <UserIcon size={16} className="text-gray-500" />
            <input
              type="text"
              id="username"
              name="name"
              placeholder="John Doe"
              required
              className="
              outline-none text-lg
              text-gray-500
              "
            />
          </div>
        </div>
        <div className="flex gap-x-4 w-[100%]">
          <div className="flex flex-col bg-white w-[50%] gap-1 p-3 rounded-[15px]">
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
                w-[70%]
              placeholder:text-[30px]
              outline-none text-lg 
              text-gray-500
              "
              />
            </div>
          </div>
          <div className="flex flex-col bg-white w-[50%] gap-1 p-3 rounded-[15px]">
            <label
              htmlFor="cnpassword"
              className="text-xl font-semibold text-gray-600"
            >
              Confirm Password
            </label>
            <div className="flex gap-1 items-center">
              <Eye
                size={16}
                className="text-gray-500    hover:text-gray-800"
                onClick={() => setPasswordShow(!passwordShow)}
              />
              <input
                type={passwordShow ? "text" : "password"}
                id="cnpassword"
                name="cnpassword"
                placeholder=".........."
                required
                className="
              outline-none text-lg
              placeholder:text-[30px]
              text-gray-500 
              w-[70%]
              "
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="border-gray-700 border-2 text-gray-700 text-lg font-semibold rounded-[15px] px-4 py-2 hover:bg-gray-700 hover:text-white w-full transition-all duration-200 ease-in-out"
        >
          Sign Up
        </button>
      </form>
      <div className="flex gap-2 ">
        <p className="text-gray-600">Already have an account?</p>
        <Link
          href="/sign-in"
          className="text-gray-700 font-semibold hover:text-gray-800"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
