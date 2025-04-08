import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: [true, "Required"] },
  emailId: { type: String, required: [true, "Required"] },
  password: { type: String, required: [true, "Required"] },
  isVerified: { type: Boolean, default: false },
  isAdmin: { type: String, default: false },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
