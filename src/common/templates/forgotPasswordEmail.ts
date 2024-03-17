export const forgotPasswordEmailTemplate = (token: string, name: string) => {
  return `
          <main>
            <h1>Dear ${name}</h1>
            <p>We received a request to reset your password for the Todo App. If you did not make this request, you can safely ignore this email.</p>

            <p>To reset your password, please click the button below:</p>

            <button>
              <a href="http://localhost:3000/update-password?token=${token}">Reset Account</a>
            </button>

            <p>Note: This link is valid for the next 30 minutes. If you don't verify your account within this timeframe, you may need to request a new verification email.</p>

            <p>If you have any questions or need further assistance, please don't hesitate to contact us at adewaleayoola.coding@gmail.com</p>


            <p>Best regards,<br>
              The Todo App Team</p>
          </main>
    `;
};
