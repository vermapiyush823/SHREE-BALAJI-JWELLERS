"use client";
import Logo from "@/assets/icons/logo.svg";
import { loginUserAction } from "@/lib/actions/auth-actions";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useFormState } from "react-dom";
import { ZodErrors } from "../errors/zod";
export default function SignInForm() {
  const INITIAL_STATE = {
    data: null,
  };
  const [formState, formAction] = useFormState(loginUserAction, INITIAL_STATE);
  const [passwordShow, setPasswordShow] = useState(false);
  console.log(formState);
  return (
    <div className="flex flex-col items-center justify-center bg-gray-200 py-10 w-fit rounded-[25px]">
      <Image src={Logo} alt="logo" width={200} height={200} />
      <form
        className="p-6 w-[35vw] gap-y-4 flex flex-col justify-center  items-center"
        action={formAction}
      >
        <div className="flex flex-col bg-white w-[100%] gap-1 p-3 rounded-[15px]">
          <label
            htmlFor="email"
            className="text-xl font-semibold text-gray-600"
          >
            Email
          </label>
          <div className="flex gap-1 items-center w-[100%]">
            <Mail size={16} className="text-gray-500" />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="username@xyz.com"
              className="
              w-[100%]
              outline-none text-lg 
              text-gray-500
              "
            />
          </div>
          <ZodErrors error={formState?.zodErrors?.email} />
        </div>
        <div className="flex flex-col bg-white w-[100%] gap-1 p-3 rounded-[15px]">
          <label
            htmlFor="password"
            className="text-xl font-semibold text-gray-600"
          >
            Password
          </label>
          <div className="flex gap-1 items-center">
            {passwordShow ? (
              <EyeOpenIcon
                onClick={() => setPasswordShow(!passwordShow)}
                className="text-gray-500 cursor-pointer"
              />
            ) : (
              <EyeClosedIcon
                onClick={() => setPasswordShow(!passwordShow)}
                className="text-gray-500 cursor-pointer"
              />
            )}
            <input
              type={passwordShow ? "text" : "password"}
              id="password"
              name="password"
              placeholder=".........."
              className="
              outline-none text-lg w-[100%]
              text-gray-500
              placeholder:text-[30px]
              "
            />
          </div>
          <ZodErrors error={formState?.zodErrors?.password} />
        </div>
        <button
          type="submit"
          className="border-gray-700 border-2 text-gray-700 text-lg font-semibold rounded-[15px] px-4 py-2 hover:bg-gray-700 hover:text-white w-full transition-all duration-200 ease-in-out"
        >
          Sign In
        </button>
        <ZodErrors error={formState?.message} />
      </form>
      <div className="flex gap-2 ">
        <p className="text-gray-600">Don&apos;t have an account?</p>
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
