"use client";
import { sendEmail } from "@/lib/actions/auth-actions";
import { useEffect, useState } from "react";

export default function SendOTPButton({ email }: { email: string }) {
  const [response, setResponse] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(60);

  const handleSendOTP = async () => {
    setIsLoading(true); // Start loading
    const res = await sendEmail(email);
    setResponse(res);
    setIsLoading(false); // Stop loading
    setTimer(60); // Reset timer to 60 seconds
  };

  useEffect(() => {
    if (response && timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(intervalId); // Clear interval on unmount
    } else if (timer === 0) {
      setResponse(false); // Enable resend button
    }
  }, [response, timer]);

  return (
    <>
      <div className="flex flex-col w-28 h-8">
        {isLoading ? (
          <div className="text-sm font-semibold rounded-[10px] p-2 bg-gray-500 text-white">
            Sending...
          </div>
        ) : !response ? (
          <button
            type="button"
            className="text-gray-700 text-sm font-semibold rounded-[10px] p-2 hover:bg-gray-700 hover:text-white transition-all duration-200 ease-in-out"
            onClick={handleSendOTP}
          >
            {timer === 0 ? "Resend OTP" : "Send OTP"}
          </button>
        ) : (
          <div className="text-sm font-semibold rounded-[10px] p-2 bg-gray-700 text-white">
            OTP Sent
          </div>
        )}
        {response && timer > 0 && (
          <span className="text-[12px] font-bold text-gray-500">
            Resend OTP in {timer} seconds
          </span>
        )}
      </div>
    </>
  );
}
