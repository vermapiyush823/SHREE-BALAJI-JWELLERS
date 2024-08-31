"use client";

import Logo from "@/assets/icons/logo.svg";
import { registerUserAction } from "@/lib/actions/auth-actions";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Mail, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useFormState } from "react-dom";
import { ZodErrors } from "../errors/zod";
export default function SignUpForm() {
  //   const [otpVerified, setOtpVerified] = useState(false);
  //   const [otpSent, setOtpSent] = useState(false);
  const [passwordShow, setPasswordShow] = useState([false, false]);
  const INITIAL_STATE = {
    data: null,
  };
  const [formState, formAction] = useFormState(
    registerUserAction,
    INITIAL_STATE
  );

  //   const inputRefs: any = useRef([]);

  //   useEffect(() => {
  //     inputRefs.current.forEach((input: any, index: any) => {
  //       if (input) {
  //         input.maxLength = 1;
  //         input.addEventListener("keyup", (e: any) => {
  //           if (e.keyCode === 8 || e.keyCode === 37) {
  //             if (index > 0) {
  //               inputRefs.current[index - 1].focus();
  //             }
  //           } else if (
  //             (e.keyCode >= 48 && e.keyCode <= 57) || // 0-9
  //             (e.keyCode >= 65 && e.keyCode <= 90) || // A-Z
  //             (e.keyCode >= 96 && e.keyCode <= 105) || // Numpad 0-9
  //             e.keyCode === 39 // Right arrow
  //           ) {
  //             if (index < inputRefs.current.length - 1) {
  //               inputRefs.current[index + 1].focus();
  //             }
  //           }
  //         });
  //       }
  //     });
  //   }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-200 py-10 w-fit rounded-[25px]">
      <Image src={Logo} alt="logo" width={200} height={200} />
      <form
        className="p-6 w-[35vw] gap-y-4 flex flex-col justify-center items-center"
        action={formAction}
      >
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
              className="outline-none text-lg text-gray-500 w-[100%]"
            />
          </div>
          <ZodErrors error={formState?.zodErrors?.email} />
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
              id="name"
              name="name"
              placeholder="John Doe"
              className="outline-none text-lg text-gray-500 w-[100%]"
            />
          </div>
          <ZodErrors error={formState?.zodErrors?.username} />
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
              {!passwordShow[0] ? (
                <EyeClosedIcon
                  className="text-gray-500 hover:text-gray-800"
                  onClick={() =>
                    setPasswordShow([!passwordShow[0], passwordShow[1]])
                  }
                />
              ) : (
                <EyeOpenIcon
                  className="text-gray-500 hover:text-gray-800"
                  onClick={() =>
                    setPasswordShow([!passwordShow[0], passwordShow[1]])
                  }
                />
              )}
              <input
                type={passwordShow[0] ? "text" : "password"}
                id="password"
                name="password"
                placeholder=".........."
                className="w-[70%] placeholder:text-[30px] outline-none text-lg text-gray-500"
              />
            </div>
            <ZodErrors error={formState?.zodErrors?.password} />
          </div>
          <div className="flex flex-col bg-white w-[50%] gap-1 p-3 rounded-[15px]">
            <label
              htmlFor="cnpassword"
              className="text-xl font-semibold text-gray-600"
            >
              Confirm Password
            </label>
            <div className="flex gap-1 items-center">
              {!passwordShow[1] ? (
                <EyeClosedIcon
                  className="text-gray-500 hover:text-gray-800"
                  onClick={() =>
                    setPasswordShow([passwordShow[0], !passwordShow[1]])
                  }
                />
              ) : (
                <EyeOpenIcon
                  className="text-gray-500 hover:text-gray-800"
                  onClick={() =>
                    setPasswordShow([passwordShow[0], !passwordShow[1]])
                  }
                />
              )}
              <input
                type={passwordShow[1] ? "text" : "password"}
                id="cnpassword"
                name="cnpassword"
                placeholder=".........."
                className="outline-none text-lg placeholder:text-[30px] text-gray-500 w-[70%]"
              />
            </div>
            <ZodErrors error={formState?.zodErrors?.confirmPassword} />
          </div>
        </div>
        <ZodErrors error={formState?.mismatcherror} />
        <button
          type="submit"
          className="border-gray-700 border-2 text-gray-700 text-lg font-semibold rounded-[15px] px-4 py-2 hover:bg-gray-700 hover:text-white w-full transition-all duration-200 ease-in-out"
        >
          Sign Up
        </button>
      </form>
      <div className="flex gap-2">
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
