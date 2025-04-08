import { connect } from "@/db/connect";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

//Make connection to MongoDB
connect();

export async function POST(req: NextRequest) {
  try {
    // Send request to login through axios
    const reqBody = await req.json();
    console.log(reqBody);
    const { emailId, password } = reqBody;
    // Check if user is found
    const user = await User.findOne({ emailId });
    console.info(user);
    if (!user) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 });
    }
    // Compare password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        { message: "Invalid Password!" },
        { status: 401 }
      );
    }

    // Create token data
    const tokenData = {
      _id: user._id,
      emailId: user.emailId,
    };
    // create token
    const token = jwt.sign(tokenData, process.env.SECRET_KEY!, {
      expiresIn: "1h",
    });
    // return response
    const response = NextResponse.json(
      { message: "User Found" + user },
      { status: 200 }
    );
    response.cookies.set("jwt-token", token, { httpOnly: true, secure: true });
    return response;
  } catch (error: any) {
    console.log("Something went wrong while logging in user");
    return NextResponse.json(
      { error: `Something went wrong ${error.message}` },
      { status: 500 }
    );
  }
}
