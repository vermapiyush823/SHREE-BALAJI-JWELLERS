import { cookies } from "next/headers";

export async function deleteAuthToken() {
  return cookies().delete("jwt");
}
