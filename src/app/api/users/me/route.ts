import { connect } from "@/db/connect";
import { getUserFromAccessToken } from "@/helper/userTokenHelper";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserFromAccessToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    console.log(user);
    return NextResponse.json({ message: "User Found", user: user });
  } catch (error) {
    console.log("Something went wrong while getting user from token", error);
  }
}
