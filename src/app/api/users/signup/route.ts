import { connect } from "@/db/connect";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import sendEmail from "@/helper/mailerHelper";
import emailTypes from "@/enums/emailTypes";
//Make connection to MongoDB
connect();
export async function POST(req: NextRequest) {
  try {
    // Accept request from req body
    const reqBody = await req.json();
    const { fullName, emailId, password } = reqBody;
    // Check if user is already exist or not
    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      return NextResponse.json({
        error: "User already exists!",
        status: 400,
      });
    }

    // Hash password before save
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullName,
      emailId,
      password: encryptedPassword,
    });
    console.log(newUser);
    // Save User
    const savedUser = await newUser.save();

    // Generate verification mail
    sendEmail({
      email: savedUser.emailId,
      emailType: emailTypes.VERIFY,
      userId: savedUser._id,
    });

    // Return Response
    return NextResponse.json(
      { message: "User created", savedUser, success: true },
      { status: 201 }
    );
  } catch (error: any) {
    // Return Error response to user
    return NextResponse.json(
      { error: `Something went wrong ${error.message}` },
      { status: 500 }
    );
  }
}
