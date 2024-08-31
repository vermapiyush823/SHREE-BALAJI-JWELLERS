import jwt from "jsonwebtoken";
export function generateAuthToken(user: any) {
  const token = jwt.sign(
    { email: user.email, name: user.name },
    process.env.JWT_PRIVATE_KEY!
  );
  return token;
}
