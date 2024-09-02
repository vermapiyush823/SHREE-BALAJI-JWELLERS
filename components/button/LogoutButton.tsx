"use client";

import Logout from "@/assets/icons/Logout.svg";
import { logoutUserAction } from "@/lib/actions/auth-actions"; // Adjust the import path
import Image from "next/image";
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
    <button onClick={handleLogout} className="ml-4">
      {}
      <Image
        src={Logout}
        alt="logout"
        width={25}
        height={25}
        className="mt-2"
      />
    </button>
  );
}
