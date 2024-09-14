import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      reuired: [true, "Name is required"],
      unique: true,
    },
    email: {
      type: String,
      reuired: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verfiyToken: String,
    verfiyTokenExpire: Date,
  },
  {
    collection: "allUsers",
  }
);

const User = mongoose.models.allUsers || mongoose.model("allUsers", userSchema);

export default User;
