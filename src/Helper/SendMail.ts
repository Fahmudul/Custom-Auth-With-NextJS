import User from "@/Models/userModel";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import toast from "react-hot-toast";
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use false for STARTTLS; true for SSL on port 465
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export const SendEmail = async (
  email: string,
  emailType: string
): Promise<string> => {
  const token = await bcryptjs.hash(email, 10);
  console.log("from line 20", token);
  if (emailType === "verify-email") {
    await User.findOneAndUpdate(
      {
        email,
      },
      {
        verfiyToken: token,
        verfiyTokenExpire: Date.now() + 60 * 60 * 10000,
      }
    );
  }
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Verify Email",
    text: "Please click the link below",
    html: `Click the link below to <a href="${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${token}">Verify your email</a>`,
  };
  let errorMessage;
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      errorMessage = error.toString();
    } else {
      console.log("Email sent: " + info.response);
      console.log("Email sent successfully"); // React toast will only work in Client Side
    }
  });
  if (errorMessage) {
    return errorMessage;
  } else {
    return "Email sent successfully";
  }
};
