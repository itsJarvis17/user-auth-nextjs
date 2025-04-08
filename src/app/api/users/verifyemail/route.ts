import { connect } from "@/db/connect";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

// Connect to database
connect();

export async function POST(request: NextRequest) {
  try {
    // Get token from request
    const reqBody = await request.json();
    const { token } = reqBody;
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    // verify user is found or not
    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired token!" },
        { status: 401 }
      );
    }
    // Update user verified status and flush out token
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    // Save user
    await user.save();
    NextResponse.redirect("/login");
    return NextResponse.json({
      message: "User verified successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
