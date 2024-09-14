import { connectDb } from "@/Database/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/Models/userModel";
export const POST = async (request: NextRequest) => {
  try {
    await connectDb();
    const userInfo = await request.json();
    console.log("from line 10", userInfo);
    const { name, email, password } = userInfo;
    const user = await User.findOne({ email });
    console.log("from line 13", user);
    
    if (user) {
      return NextResponse.json({ message: "User already exists", status: 400 });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    const user_1 = await User.findOne({ email });
    console.log("from line 22", user_1);

    return NextResponse.json(userInfo);
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      customMessage: "error",
      status: 500,
    });
  }
};
