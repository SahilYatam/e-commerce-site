import Router from "express";

import { handleRefreshAccessToken } from "../controllers/session.controller.js";


const router = Router();

router.post(
  "/refresh-access-token", handleRefreshAccessToken
);

export default router;
