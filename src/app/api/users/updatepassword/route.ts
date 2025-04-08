import { connect } from "@/db/connect";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

// Connect MongoDB
connect();

export async function POST(req: NextRequest) {
  try {
    // Grab toekn from request
    const reqBody = await req.json();
    console.log("Req Body", reqBody);
    const { token, newPassword } = reqBody;
    // Verify token validity
    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });
    console.log("User:", user);
    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired token!" },
        { status: 401 }
      );
    }
    console.log(user);
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    // Encrypt password
    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    // Store the password in DB
    user.password = encryptedPassword;
    await user.save();
    // Return Response
    return NextResponse.json(
      { message: "Password updated successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong while updating password" },
      { status: 500 }
    );
  }
}
