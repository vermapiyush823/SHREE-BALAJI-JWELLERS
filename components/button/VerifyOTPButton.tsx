"use client";
import { Check, Loader2 } from "lucide-react";
import { useState } from "react";

export default function VerifyOTPButton({
  otp,
  onVerified,
}: {
  otp: string;
  onVerified: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      setError("Please enter a complete OTP");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp,
          tokenId: localStorage.getItem("otpTokenId"),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResponse(true);
        onVerified();
      } else {
        setError(data.error || "Invalid OTP");
        setResponse(false);
      }
    } catch (error) {
      setError("Verification failed");
      setResponse(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleVerifyOTP}
      disabled={loading || response}
      className={`
        relative px-4 py-2 text-sm font-medium rounded-lg
        shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2
        transition-all duration-200 min-w-[100px]
        ${
          response
            ? "bg-gray-800 text-white hover:bg-gray-700"
            : loading
            ? "bg-gray-100 text-gray-500 cursor-not-allowed"
            : "border border-gray-300 text-gray-700 hover:bg-gray-50"
        }
      `}
    >
      <span className="flex items-center justify-center gap-2">
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Verifying</span>
          </>
        ) : response ? (
          <>
            <Check className="w-4 h-4" />
            <span>Verified</span>
          </>
        ) : (
          "Verify OTP"
        )}
      </span>
    </button>
  );
}
