import Profile from "@/components/profile/profile";
import { getUserById } from "@/lib/actions/user.actions";
import { getAuthToken } from "@/lib/getAuthToken";
import { jwtDecode } from "jwt-decode";
interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}
interface jwtPayload {
  _id: string;
}
const ProfilePage = async () => {
  const token = await getAuthToken();
  if (!token) return null;
  const decodedToken: jwtPayload = jwtDecode(token);
  const user: User = await getUserById(decodedToken._id);
  return (
    <>
      <Profile user={user} />
    </>
  );
};
export default ProfilePage;
