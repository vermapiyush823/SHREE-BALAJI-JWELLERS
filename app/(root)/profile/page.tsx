// /app/(root)/profile/page.tsx (Server Component)
import Profile from "@/components/profile/profile";
import { getUserById } from "@/lib/actions/user.actions";
import { getAuthToken } from "@/lib/getAuthToken";
import { jwtDecode } from "jwt-decode";
import { headers } from "next/headers";

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  imgURL: string;
  isVerified: boolean;
  gender: string;
  imgType: string;
  addresses: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    label: string;
    phoneNumber: string;
  }[];
}

interface jwtPayload {
  _id: string;
}

const ProfilePage = async () => {
  const token = headers().get("Authorization") || (await getAuthToken());
  if (!token) return null;

  const decodedToken: jwtPayload = jwtDecode(token);
  const user: User = await getUserById(decodedToken._id);

  return (
    <div className="min-h-fit">
      <Profile user={user} />
    </div>
  );
};

export default ProfilePage;
