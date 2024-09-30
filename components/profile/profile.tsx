interface ProfileProps {
  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
}
const Profile = (user: ProfileProps) => {
  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
};
export default Profile;
