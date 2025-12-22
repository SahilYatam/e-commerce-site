import Router from "express";
import { productController } from "../controllers/product.controller.js";
import { productValidation } from "../validators/product.validator.js";

import { authentication } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/auth.middleware.js";
import { validateRequest } from "../middlewares/joiValidation.middleware.js";

import { uploadSingleImage } from "../middlewares/multer.middleware.js";

const router = Router();

router.post(
    "/add-products",
    authentication,
    authorizeRole("seller"),
    uploadSingleImage,
    // validateRequest(productValidation.addProductSchema),
    productController.addProduct
);

router.delete(
    "/delete/:id",
    authentication,
    authorizeRole("seller"),
    validateRequest(productValidation.deleteProductSchema, ["body", "params"]),
    productController.deleteProduct
);

router.patch(
    "/update/:id",
    authentication,
    authorizeRole("seller"),
    validateRequest(productValidation.updateProductSchema, ["body", "params"]),
    productController.updateProduct
);

router.get(
    "/all-products",
    validateRequest(productValidation.getAllProductsSchema),
    productController.getAllProducts
);

router.get(
    "/product-category",
    validateRequest(productValidation.getProductsByCategorySchema, "query"),
    productController.getProductsByCategory
);

router.get(
    "/search",
    validateRequest(productValidation.searchProductSchema, "query"),
    productController.searchProducts
);

router.get(
    "/:id",
    validateRequest(productValidation.getProductByIdSchema, "params"),
    productController.getProductById
);

export default router;