"use client";
import { verifyOTP } from "../../lib/actions/auth-actions";
export default function SendOTPButton(otp) {
  return (
    <button
      type="button"
      className=" text-gray-700 text-sm font-semibold rounded-[10px] p-2 hover:bg-gray-700 hover:text-white transition-all duration-200 ease-in-out"
      onClick={() => verifyOTP(otp.otp)}
    >
      Verify
    </button>
  );
}
