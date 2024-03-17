import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: [true, "First name is required"] },
    lastName: { type: String, required: [true, "Last name is required"] },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      select: false,
    },
    refreshToken: { type: String, select: false },

    isVerified: { type: Boolean },
    verificationEmailExpiration: { type: Date, select: false },
    verificationToken: { type: String, select: false },
    forgotPasswordEmailExpiration: { type: Date, select: false },
    forgotPasswordToken: { type: String, select: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
