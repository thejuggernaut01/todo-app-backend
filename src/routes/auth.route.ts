import express from "express";

import {
  register,
  login,
  protect,
  resendEmail,
  verifyEmail,
  forgotPassword,
  updatePassword,
  logout,
} from "../controllers/auth.controller";
import validate from "../common/schemas/validate";
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resendEmailSchema,
  updatePasswordSchema,
  verifyEmailSchema,
} from "../common/schemas/authSchema";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/resend-email", validate(resendEmailSchema), resendEmail);
router.post("/verify-email", validate(verifyEmailSchema), verifyEmail);
router.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword);
router.patch(
  "/update-password",
  validate(updatePasswordSchema),
  updatePassword
);

router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);
router.use(protect);

router.get("/test", (req, res) => {
  res.send("Authentication route!");
});
export default router;
