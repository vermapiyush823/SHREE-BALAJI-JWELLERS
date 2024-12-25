"use client";

import { logoutUserAction } from "@/lib/actions/auth-actions"; // Adjust the import path
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    // Call the server action
    await logoutUserAction();
    // Redirect on the client side as well, or you can do any other UI-related tasks here
    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center text-gray-600 hover:text-black"
    >
      {}
      <LogOutIcon size={20} />
    </button>
  );
}
