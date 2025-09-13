import Router from "express";
import { cartController } from "../controllers/cart.controller.js";
import { cartValidator } from "../validators/cart.validator.js";

import { authentication } from "../middlewares/auth.middleware.js";
import { validateRequest } from "../middlewares/joiValidation.middleware.js";

const router = Router();

router.post(
  "/add/:id",
  authentication,
  validateRequest(cartValidator.addToCartSchema, "params"),
  cartController.addToCart
);

router.delete(
  "/decrease-quantity/:id",
  authentication,
  validateRequest(cartValidator.decreaseQuantitySchema, "params"),
  cartController.decreaseQuantity
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
