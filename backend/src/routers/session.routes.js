import { Router } from "express";

import { handleRefreshAccessToken } from "../controllers/session.controller.js";
import { refreshAccessTokenSchema } from "../validators/session.validator.js";

import { validateRequest } from "../middlewares/joiValidation.middleware.js";
import { authentication } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/refresh-access-token", authentication, validateRequest(refreshAccessTokenSchema, "cookies"), handleRefreshAccessToken)

export default router;