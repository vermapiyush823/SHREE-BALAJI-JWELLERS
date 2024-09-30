import jwt from "jsonwebtoken";
export function generateAuthToken(user: any) {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_PRIVATE_KEY!);
  return token;
}
