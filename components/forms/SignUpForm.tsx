"use client";
import Logo from "@/assets/icons/logo.svg";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Loader2, Lock, Mail, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import SendOTPButton from "../button/SendOTPButton";
import VerifyOTPButton from "../button/VerifyOTPButton";

interface FormErrors {
  email?: string;
  name?: string;
  password?: string;
  confirmPassword?: string;
  otp?: string;
}

export default function SignUpForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordShow, setPasswordShow] = useState([false, false]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // OTP input handling
  useEffect(() => {
    inputRefs.current.forEach((input, index) => {
      if (input) {
        input.maxLength = 1;
        const handleKeyUp = (e: KeyboardEvent) => {
          const target = e.target as HTMLInputElement;

          if (e.key === "Backspace") {
            if (index > 0 && !target.value) {
              inputRefs.current[index - 1]?.focus();
            }
          } else if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
          } else if (
            e.key === "ArrowRight" &&
            index < inputRefs.current.length - 1
          ) {
            inputRefs.current[index + 1]?.focus();
          } else if (/^[0-9]$/.test(e.key)) {
            if (index < inputRefs.current.length - 1) {
              setTimeout(() => inputRefs.current[index + 1]?.focus(), 0);
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

  const validateForm = () => {
    const errors: FormErrors = {};

    // Email validation
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email address";
    }

    // Only validate other fields if OTP is verified
    if (otpVerified) {
      // Name validation
      if (!name.trim()) {
        errors.name = "Name is required";
      } else if (name.trim().length < 2) {
        errors.name = "Name must be at least 2 characters";
      }

      // Password validation
      if (!password) {
        errors.password = "Password is required";
      } else if (password.length < 8) {
        errors.password = "Password must be at least 8 characters";
      }

      // Confirm password validation
      if (!confirmPassword) {
        errors.confirmPassword = "Please confirm your password";
      } else if (password !== confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
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
      const response = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[420px] space-y-4 sm:space-y-8 bg-white p-8  rounded-xl sm:rounded-2xl shadow-lg">
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
            Get started with your account
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
              <div className="absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
                readOnly={otpVerified}
              />
            </div>
            {formErrors.email && (
              <p className="text-xs text-red-600">{formErrors.email}</p>
            )}
          </div>

          {/* OTP Section */}
          {!otpVerified && (
            <div className="space-y-3 sm:space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Verify Email
              </label>
              <div className="flex flex-col w-full items-center gap-4">
                <div className="flex justify-between w-full">
                  {[...Array(6)].map((_, i) => (
                    <input
                      key={i}
                      ref={(el) => {
                        inputRefs.current[i] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]"
                      aria-label={`digit ${i + 1}`}
                      className="w-10 h-10 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                      placeholder="0"
                      maxLength={1}
                    />
                  ))}
                </div>
                <div className="flex justify-start gap-2 w-full ">
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
              {/* Name Field */}
              <div className="space-y-1 sm:space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setFormErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    autoComplete="name"
                    required
                    className={`appearance-none relative block w-full pl-10 pr-3 py-2 text-sm sm:text-base border ${
                      formErrors.name
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-gray-500 focus:border-gray-500"
                    } rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 transition-colors duration-200`}
                    placeholder="John Doe"
                  />
                </div>
                {formErrors.name && (
                  <p className="text-xs text-red-600">{formErrors.name}</p>
                )}
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
                      id="password"
                      name="password"
                      type={passwordShow[0] ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setFormErrors((prev) => ({
                          ...prev,
                          password: undefined,
                        }));
                      }}
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
                  {formErrors.password && (
                    <p className="text-xs text-red-600">
                      {formErrors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-1 sm:space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={passwordShow[1] ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setFormErrors((prev) => ({
                          ...prev,
                          confirmPassword: undefined,
                        }));
                      }}
                      required
                      className={`appearance-none relative block w-full pl-10 pr-10 py-2 text-sm sm:text-base border ${
                        formErrors.confirmPassword
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-gray-500 focus:border-gray-500"
                      } rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 transition-colors duration-200`}
                      placeholder="••••••••"
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
                  {formErrors.confirmPassword && (
                    <p className="text-xs text-red-600">
                      {formErrors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="relative w-full px-4 py-3 text-sm sm:text-base font-semibold text-white bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating Account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>
            </>
          )}
        </form>

        {/* Error Message */}
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm font-medium text-red-800">{error}</p>
          </div>
        )}

        {/* Sign In Link */}
        <div className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-blue-500 hover:text-blue-600"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
