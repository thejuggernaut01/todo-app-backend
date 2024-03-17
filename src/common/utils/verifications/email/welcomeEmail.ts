import { smtpexpressClient } from "../../../config/emailConfig";
import { welcomeEmailTemplate } from "../../../templates/welcomeEmail";

const welcomeEmail = async (email: string, name: string) => {
  const response = await smtpexpressClient.sendApi.sendMail({
    subject: "Welcome to The Todo App",
    message: welcomeEmailTemplate(name),
    sender: {
      name: "The Todo App",
      email: process.env.SMTP_SENDER_ADDRESS,
    },
    recipients: {
      name: name,
      email: email,
    },
  });

  return response;
};

export default welcomeEmail;
