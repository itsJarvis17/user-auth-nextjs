import emailTypes from "@/enums/emailTypes";
import sendEmail from "@/helper/mailerHelper";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/db/connect";
//TODO: Implement route for forget password

connect();
export async function POST(req: NextRequest) {
  try {
    // Get emailId from body
    const reqBody = await req.json();
    const { emailId } = reqBody;
    // Check user based on emailId
    const user = await User.findOne({ emailId });
    if (!user) {
      return NextResponse.json(
        { message: "User doesn't found!" },
        { status: 404 }
      );
    }

    // If user found then generate token and send email to user
    sendEmail({
      email: user.emailId,
      emailType: emailTypes.FORGET_PASSWORD,
      userId: user._id,
    });

    // Return response
    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Something went wrong while logging in user");
    return NextResponse.json(
      { error: `Something went wrong ${error.message}` },
      { status: 500 }
    );
  }
}
