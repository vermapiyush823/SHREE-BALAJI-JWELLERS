"use client";
import { useState } from "react";
import { verifyOTP } from "../../lib/actions/auth-actions";

export default function VerifyOTPButton({
  otp,
  onVerified,
}: {
  otp: string;
  onVerified: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(false);

  const handleVerifyOTP = async () => {
    setLoading(true);
    const res = await verifyOTP(otp);
    setResponse(res);
    console.log(res);

    if (res) {
      onVerified(); // Call the callback function to update otpVerified state in parent
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col w-28 h-16">
      {!response ? (
        !loading ? (
          <button
            type="button"
            className="text-gray-700 text-sm font-semibold rounded-[10px] p-2 hover:bg-gray-700 hover:text-white transition-all duration-200 ease-in-out"
            onClick={handleVerifyOTP}
          >
            Verify OTP
          </button>
        ) : (
          <div className="text-sm font-semibold rounded-[10px] p-2 bg-gray-500 text-white">
            Verifying...
          </div>
        )
      ) : (
        <div className="text-sm font-semibold rounded-[10px] p-2 bg-gray-700 text-white">
          Verified
        </div>
      )}
    </div>
  );
}
