"use client";
import Logo from "@/assets/icons/logo.svg";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Loader2, Lock, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SignInForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const validateForm = () => {
    const errors: { email?: string; password?: string } = {};

    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!password) {
      errors.password = "Password is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[420px] space-y-6 sm:space-y-8 bg-white p-4 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg">
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
            Welcome Back
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600 text-center">
            Please sign in to your account
          </p>
        </div>

        {/* Form */}
        <form
          className="mt-6 sm:mt-8 space-y-4 sm:space-y-6"
          onSubmit={handleSubmit}
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
                onChange={(e) => {
                  setEmail(e.target.value);
                  setFormErrors((prev) => ({ ...prev, email: undefined }));
                }}
                autoComplete="email"
                required
                className={`appearance-none relative block w-full pl-10 pr-3 py-2 text-sm sm:text-base border ${
                  formErrors.email
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-gray-500 focus:border-gray-500"
                } rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 transition-colors duration-200`}
                placeholder="you@example.com"
              />
            </div>
            {formErrors.email && (
              <p className="text-xs text-red-600">{formErrors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-1 sm:space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={passwordShow ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setFormErrors((prev) => ({ ...prev, password: undefined }));
                }}
                autoComplete="current-password"
                required
                className={`appearance-none relative block w-full pl-10 pr-10 py-2 text-sm sm:text-base border ${
                  formErrors.password
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
                  <EyeOpenIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <EyeClosedIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
            {formErrors.password && (
              <p className="text-xs text-red-600">{formErrors.password}</p>
            )}
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-gray-600 hover:text-gray-800"
            >
              Forgot password?
            </Link>
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="relative w-full px-4 py-3 text-sm sm:text-base font-semibold text-white bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-xs sm:text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/sign-up"
                className="font-medium text-blue-500 hover:text-gray-600"
              >
                Sign up now
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
