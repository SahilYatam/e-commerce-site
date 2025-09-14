import Router from "express";

import { orderController } from "../controllers/order.controller.js";
import { orderValidator } from "../validators/order.validator.js";

import { validateRequest } from "../middlewares/joiValidation.middleware.js";
import { authentication } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/purchase/:id",
  authentication,
  validateRequest(orderValidator.buyProductSchema, ["body", "params"]),
  orderController.buyProduct
);

router.patch(
  "/cancel-order/:id",
  authentication,
  validateRequest(orderValidator.cancelOrderSchema, ["body", "params"]),
  orderController.cancelOrder
);

router.get(
  "/orders",
  authentication,
  authorizeRole("seller"),
  orderController.getOrders
);

router.delete(
  "/delete-order/:id",
  authentication,
  authorizeRole("seller"),
  validateRequest(orderValidator.removeOrderSchema, ["body", "params"]),
  orderController.removeOrder
);

export default router;
