export const verifyEmailTemplate = (token: string, name: string) => {
  return `
          <main>
            <h1>Dear ${name}</h1>

            <h2>Welcome to the Todo App! We're thrilled to have you on board.</h2>

            <p>To complete your registration and start using our app, please verify your email address by clicking the following link: <a href="http://localhost:3000/verify-email?token=${token}">Verify Account</a></p>

            <p>Note: This link is valid for the next 30 minutes. If you don't verify your account within this timeframe, you may need to request a new verification email.</p>

            <p>Please note that you won't be able to access all features of the app until your email is verified.</p>

            <p>If you have any questions or need further assistance, please don't hesitate to contact us at adewaleayoola.coding@gmail.com</p>

            <p>Best regards,<br>
              The Todo Team</p>
          </main>
    `;
};
