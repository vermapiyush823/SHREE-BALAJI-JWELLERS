"use client";
import { sendEmail } from "@/lib/actions/auth-actions";

export default function SendOTPButton() {
  const handleSendOTP = async () => {
    await sendEmail("vermapiyush823@gmail.com");
  };

  return (
    <button
      type="button"
      className=" text-gray-700 text-sm font-semibold rounded-[10px] p-2 hover:bg-gray-700 hover:text-white transition-all duration-200 ease-in-out"
      onClick={handleSendOTP}
    >
      Send
    </button>
  );
}
