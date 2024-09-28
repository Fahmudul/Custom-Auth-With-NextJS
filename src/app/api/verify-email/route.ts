import User from "@/Models/userModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    console.log("from line 8", token);
    console.log(token);
    const user = await User.findOne({
      verfiyToken: token,
      verfiyTokenExpire: { $gt: Date.now() },
    });
    console.log("from line 14 user", user);
    if (!user) {
      return NextResponse.json({ message: "Invalid token", status: 400 });
    }
    user.isVerified = true;
    user.verfiyToken = undefined;
    user.verfiyTokenExpire = undefined;
    await user.save();
    return NextResponse.json({
      message: "Email verified successfully",
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
};
