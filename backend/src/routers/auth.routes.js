import { Router } from "express";

import { authController } from "../controllers/auth.controller.js";
import { authValidate } from "../validators/auth.validator.js";

import { validateRequest } from "../middlewares/joiValidation.middleware.js";
import { authentication } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/singup",
  validateRequest(authValidate.singupSchema),
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
  validateRequest(authValidate.logoutSchema),
  authController.logout
);

router.post(
  "/change-password",
  authentication,
  validateRequest(authValidate.changePasswordSchema),
  authController.changePassword
);

router.post(
  "/change-name",
  authentication,
  validateRequest(authValidate.changeNameSchema),
  authController.changeUserName
);

router.get("/user", authentication, authController.getUser);

export default router;
