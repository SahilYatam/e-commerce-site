import Router from "express";

import { authController } from "../controllers/auth.controller.js";
import { authValidate } from "../validators/auth.validator.js";

import { validateRequest } from "../middlewares/joiValidation.middleware.js";
import { authentication } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/signup",
  validateRequest(authValidate.signupSchema),
  authController.signup
);

router.post(
  "/login",
  validateRequest(authValidate.loginSchema),
  authController.login
);

router.post(
  "/logout",
  authentication,
  validateRequest(authValidate.logoutSchema, "cookies"),
  authController.logout
);

router.post(
    "/forget-password",
    validateRequest(authValidate.forgetPasswordSchema),
    authController.forgetPasswordRequest
);

router.post(
    "/reset-password/:token",
    validateRequest(authValidate.resetPasswordSchema, ["body", "params"]),
    authController.resetPassword
)

router.get("/user", authentication, authController.getUser);

export default router;
