import { Response } from "express";
import crypto from "crypto";

import { smtpexpressClient } from "../../../config/emailConfig";
import { verifyEmailTemplate } from "../../../templates/verifyEmail";
import User from "../../../../models/user.model";

const verificationEmail = async (email: string, res: Response) => {
  // generate verification token and save user to the database with isVerified set to false
  crypto.randomBytes(32, async (err: Error, buffer: any) => {
    if (err) {
      return res.status(400).json({
        status: "Error",
        message: "An error occured",
      });
    }

    // convert the randomBytes buffer to hex string
    const token = buffer.toString("hex");

    // if if email exists, update the db
    const user = await User.findOneAndUpdate(
      { email },
      {
        isVerified: false,
        verificationToken: token,
        verificationEmailExpiration: Date.now() + 1800000,
      },
      { returnOriginal: false }
    );

    const response = await smtpexpressClient.sendApi.sendMail({
      subject: "Verify your email address",
      message: verifyEmailTemplate(token, user.firstName),
      sender: {
        name: "The Todo App",
        email: process.env.SMTP_SENDER_ADDRESS,
      },
      recipients: {
        name: user.firstName,
        email: email,
      },
    });

    return response;
  });
};

export default verificationEmail;
