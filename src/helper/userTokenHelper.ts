import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
export function getUserFromAccessToken(request: NextRequest) {
  try {
    const token = request.cookies.get("jwt-token")?.value || null;
    const decodedToken: any = jwt.verify(token!, process.env.SECRET_KEY!);
    return decodedToken._id;
  } catch (error: any) {
    throw new Error("Invalid token", error);
  }
}
