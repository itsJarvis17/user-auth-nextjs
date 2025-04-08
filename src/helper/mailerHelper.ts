import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import emailTypes from "@/enums/emailTypes";
import nodemailer from "nodemailer";
const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // Create hahsed token
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    // Find the user by id
    console.log(emailType);
    if (emailType === emailTypes.VERIFY) {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 1000 * 60 * 15, // 15 minutes expiry
      });
    }
    if (emailType === emailTypes.FORGET_PASSWORD) {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 1000 * 60 * 15, // 15 minutes expiry
      });
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    let transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: "Bhargav Naware <bhargav.naware@gmail.com>",
      to: email,
      subject:
        emailTypes.VERIFY === emailType
          ? "Verify your email"
          : "Reset your password",
      html: `<p>Click <a href="${process.env.DOMAIN}${
        emailTypes.VERIFY === emailType ? "verifyemail" : "updatepassword"
      }?token=${hashedToken}">here</a>to ${
        emailTypes.VERIFY === emailType
          ? "Verify your email"
          : "Reset your password"
      }</p>`,
    };

    // Send email
    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default sendEmail;
