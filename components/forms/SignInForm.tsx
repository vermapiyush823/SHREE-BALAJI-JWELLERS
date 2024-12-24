"use client";
import Logo from "@/assets/icons/logo.svg";
import { loginUserAction } from "@/lib/actions/auth-actions";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Loader2, Lock, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { ZodErrors } from "../errors/zod";

// Submit Button Component with loading state
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
          Signing in...
        </span>
      ) : (
        "Sign In"
      )}
    </button>
  );
}

export default function SignInForm() {
  const router = useRouter();
  const INITIAL_STATE = { data: null };
  const [formState, formAction] = useFormState(loginUserAction, INITIAL_STATE);
  const [passwordShow, setPasswordShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Form validation
  const isEmailValid = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isPasswordValid = (password: string) => {
    return password.length >= 6;
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className=" max-w-lg w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg">
        {/* Logo and Header */}
        <div className="flex flex-col items-center">
          <Image
            src={Logo}
            alt="Logo"
            width={150}
            height={150}
            className="mb-6"
            priority
          />
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-600">
            Please sign in to your account
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" action={formAction} noValidate>
          {/* Email Field */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className={`appearance-none relative block w-full pl-10 pr-3 py-2 border ${
                  formState?.zodErrors?.email
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-gray-500 focus:border-gray-500"
                } rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 transition-colors duration-200`}
                placeholder="you@example.com"
              />
            </div>
            <ZodErrors error={formState?.zodErrors?.email} />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={passwordShow ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className={`appearance-none relative block w-full pl-10 pr-10 py-2 border ${
                  formState?.zodErrors?.password
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-gray-500 focus:border-gray-500"
                } rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 transition-colors duration-200`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setPasswordShow(!passwordShow)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {passwordShow ? (
                  <EyeOpenIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <EyeClosedIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
            <ZodErrors error={formState?.zodErrors?.password} />
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center gap-x-12 justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                href="/forgot-password"
                className="font-medium text-gray-600 hover:text-gray-800"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          {/* Form Error Message */}
          {formState?.message && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    {formState.message}
                  </h3>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <SubmitButton />

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/sign-up"
                className="font-medium text-gray-800 hover:text-gray-900"
              >
                Sign up now
              </Link>
            </p>
          </div>
        </form>

        {/* Social Login Options */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              Google
            </button>
            <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
