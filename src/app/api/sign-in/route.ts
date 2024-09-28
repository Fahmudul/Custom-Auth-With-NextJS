import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import User from "@/Models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/Database/dbConfig";

export const POST = async (request: NextRequest) => {
  try {
    await connectDb();
    const userInfo = await request.json();
    const { email, password } = userInfo;
    const user = await User.findOne({ email });
    console.log("from line 12 user", user);
    if (!user) {
      return NextResponse.json({ message: "User not found", status: 400 });
    }
    if (!user.isVerified) {
      return NextResponse.json({
        message: "Please verify your email",
        status: 400,
      });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Wrong password", status: 400 });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json({
      message: "Login successfully",
      token: token,
      status: 200,
    });
    response.cookies.set("token", token);
    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
};
