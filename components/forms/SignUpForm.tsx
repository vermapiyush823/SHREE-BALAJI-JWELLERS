"use client";
import Logo from "@/assets/icons/logo.svg";
import { registerUserAction } from "@/lib/actions/auth-actions";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Loader2, Lock, Mail, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import SendOTPButton from "../button/SendOTPButton";
import VerifyOTPButton from "../button/VerifyOTPButton";
import { ZodErrors } from "../errors/zod";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="relative w-full px-4 py-3 text-base font-semibold text-white bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {pending ? (
        <span className="flex items-center justify-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          Creating Account...
        </span>
      ) : (
        "Sign Up"
      )}
    </button>
  );
}

export default function SignUpForm() {
  const INITIAL_STATE = { data: null };
  const [formState, formAction] = useFormState(
    registerUserAction,
    INITIAL_STATE
  );
  const [passwordShow, setPasswordShow] = useState([false, false]);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current.forEach((input, index) => {
      if (input) {
        input.maxLength = 1;
        const handleKeyUp = (e: KeyboardEvent) => {
          if (e.key === "Backspace" || e.key === "ArrowLeft") {
            if (index > 0) inputRefs.current[index - 1]?.focus();
          } else if (/[0-9]/.test(e.key) || e.key === "ArrowRight") {
            if (index < inputRefs.current.length - 1) {
              inputRefs.current[index + 1]?.focus();
            }
          }
          const otpValue = inputRefs.current
            .map((input) => input?.value || "")
            .join("");
          setOtp(otpValue);
        };

        input.addEventListener("keyup", handleKeyUp);
        return () => input.removeEventListener("keyup", handleKeyUp);
      }
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[420px] sm:max-w-5xl space-y-6 sm:space-y-8 bg-white p-4 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg">
        {/* Logo and Header */}
        <div className="flex flex-col items-center">
          <Image
            src={Logo}
            alt="Logo"
            width={120}
            height={120}
            className="mb-4 sm:mb-6 w-24 sm:w-32"
            priority
          />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Create Account
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600 text-center">
            Please fill in the details to create your account
          </p>
        </div>

        {/* Form */}
        <form
          className="mt-6 sm:mt-8 space-y-4 sm:space-y-6"
          action={formAction}
          noValidate
        >
          {/* Email Field */}
          <div className="space-y-1 sm:space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 z-10 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className={`appearance-none relative block w-full pl-10 pr-3 py-2 text-sm sm:text-base border ${
                  formState?.zodErrors?.email
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-gray-500 focus:border-gray-500"
                } rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 transition-colors duration-200`}
                placeholder="you@example.com"
                readOnly={otpVerified}
              />
            </div>
            <ZodErrors error={formState?.zodErrors?.email} />
          </div>

          {/* OTP Section */}
          {!otpVerified && (
            <div className="space-y-3 sm:space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Verify Email
              </label>
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex gap-1 sm:gap-2">
                  {[...Array(6)].map((_, i) => (
                    <input
                      key={i}
                      ref={(el) => {
                        inputRefs.current[i] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      aria-label={`digit ${i + 1}`}
                      className="w-8 sm:w-10 h-8 sm:h-10 text-center text-base sm:text-lg font-semibold border border-gray-300 rounded-lg focus:border-gray-500 focus:outline-none"
                      placeholder="0"
                    />
                  ))}
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <SendOTPButton email={email} />
                  <VerifyOTPButton
                    otp={otp}
                    onVerified={() => setOtpVerified(true)}
                  />
                </div>
              </div>
            </div>
          )}

          {otpVerified && (
            <>
              {/* Username Field */}
              <div className="space-y-1 sm:space-y-2">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    className="appearance-none relative block w-full pl-10 pr-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors duration-200"
                  />
                </div>
                <ZodErrors error={formState?.zodErrors?.username} />
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1 sm:space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    </div>
                    <input
                      type={passwordShow[0] ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="••••••••"
                      className="appearance-none relative block w-full pl-10 pr-10 py-2 text-sm sm:text-base border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors duration-200"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setPasswordShow([!passwordShow[0], passwordShow[1]])
                      }
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {passwordShow[0] ? (
                        <EyeOpenIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <EyeClosedIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  <ZodErrors error={formState?.zodErrors?.password} />
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <label
                    htmlFor="cnpassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    </div>
                    <input
                      type={passwordShow[1] ? "text" : "password"}
                      id="cnpassword"
                      name="cnpassword"
                      placeholder="••••••••"
                      className="appearance-none relative block w-full pl-10 pr-10 py-2 text-sm sm:text-base border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors duration-200"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setPasswordShow([passwordShow[0], !passwordShow[1]])
                      }
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {passwordShow[1] ? (
                        <EyeOpenIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <EyeClosedIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  <ZodErrors error={formState?.zodErrors?.confirmPassword} />
                </div>
              </div>

              <SubmitButton />
            </>
          )}
        </form>
        <ZodErrors error={formState?.mismatcherror} />

        {/* Sign In Link */}
        <div className="text-center">
          <p className="text-xs sm:text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-gray-800 hover:text-gray-900"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
