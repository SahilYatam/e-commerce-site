import Router from "express";

import { orderController } from "../controllers/order.controller.js";
import { orderValidator } from "../validators/order.validator.js";

import { validateRequest } from "../middlewares/joiValidation.middleware.js";
import { authentication } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
    "/buy-now/:id",
    authentication,
    validateRequest(orderValidator.buyProductSchema, ["body", "params"]),
    orderController.buyNow
);

router.post(
    "/checkout",
    authentication,
    orderController.checkoutCart
)

router.patch(
    "/confirm-order/:id",
    authentication,
    authorizeRole("seller"),
    orderController.confirmOrder
);

router.patch(
    "/reject-order/:id",
    authentication,
    authorizeRole("seller"),
    orderController.rejectOrder
);

router.patch(
    "/cancel-order/:id",
    authentication,
    validateRequest(orderValidator.cancelOrderSchema, ["body", "params"]),
    orderController.cancelOrder
);

router.patch(
    "/hide-order/:id",
    authentication,
    validateRequest(orderValidator.hideOrderSchema, ["body", "params"]),
    orderController.hideOrder
);

router.get(
    "/user-orders",
    authentication,
    orderController.getAllOrdersForUser
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
