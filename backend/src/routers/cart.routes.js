import Router from "express";
import { cartController } from "../controllers/cart.controller.js";
import { cartValidator } from "../validators/cart.validator.js";

import { authentication } from "../middlewares/auth.middleware.js";
import { validateRequest } from "../middlewares/joiValidation.middleware.js";

const router = Router();

router.post(
  "/add/:id",
  authentication,
  validateRequest(cartValidator.addToCartSchema, ["body", "params"]),
  cartController.addToCart
);

router.patch(
  "/update-quantity/:id",
  authentication,
  validateRequest(cartValidator.updateCartQuantity, ["body", "params"]),
  cartController.updateQuantity
);

router.delete(
  "/delete/:id",
  authentication,
  validateRequest(cartValidator.removeFromCartSchema, "params"),
  cartController.removeFromcart
);

router.get(
  "/cart-items",
  authentication,
  validateRequest(cartValidator.getCartItemsSchema),
  cartController.getCartItems
);

export default router;
