"use client";

import { Loader2, RefreshCw, Send } from "lucide-react";
import { useEffect, useState } from "react";

export default function SendOTPButton({ email }: { email: string }) {
  const [response, setResponse] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(60);

  const handleSendOTP = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("otpTokenId", data.tokenId);
        setResponse(true);
        setTimer(60);
      } else {
        setResponse(false);
      }
    } catch (error) {
      console.error("Failed to send OTP:", error);
      setResponse(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (response && timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    } else if (timer === 0) {
      setResponse(false);
    }
  }, [response, timer]);

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleSendOTP}
        disabled={isLoading || (response && timer > 0)}
        className={`
          relative px-4 py-2 text-sm font-medium rounded-lg
          shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2
          transition-all duration-200 min-w-[120px]
          ${
            response
              ? "bg-gray-800 text-white"
              : isLoading
              ? "bg-gray-100 text-gray-500 cursor-not-allowed"
              : "border border-gray-300 text-gray-700 hover:bg-gray-50"
          }
        `}
      >
        <span className="flex items-center justify-center gap-2">
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending</span>
            </>
          ) : response ? (
            <>
              <Send className="w-4 h-4" />
              {response && timer > 0 && timer < 59 ? (
                <span className="text-xs font-medium text-gray-100">
                  Resend in {timer}s
                </span>
              ) : (
                <span className="text-xs font-medium text-gray-100">
                  OTP Sent
                </span>
              )}
            </>
          ) : (
            <>
              {timer === 0 ? (
                <>
                  <RefreshCw className="w-4 h-4" />
                  <span>Resend OTP</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send OTP</span>
                </>
              )}
            </>
          )}
        </span>
      </button>
    </div>
  );
}
