import Joi from "joi"

const objectId = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

const userIdField = objectId.required().messages({
    "any.required": "User ID is required",
    "string.empty": "User ID cannot be empty",
    "string.pattern.base": "User ID must be a valid MongoDB ObjectId"
});

const productIdField = objectId.required().messages({
    "any.required": "Product ID is required",
    "string.empty": "Product ID cannot be empty",
    "string.pattern.base": "Product ID must be a valid MongoDB ObjectId"
});

const quantityField = Joi.number().integer().min(1).default(1).messages({
    "number.base": "Quantity must be a number",
    "number.min": "Quantity must be greater than 0",
    "number.integer": "Quantity must be an integer"
});

const addToCartSchema = Joi.object({ userId: userIdField, productId: productIdField, quantity: quantityField });

const updateCartQuantity = Joi.object({ userId: userIdField, productId: productIdField, quantity: quantityField });

const removeFromCartSchema = Joi.object({ 
  id: productIdField 
});

const getCartItemsSchema = Joi.object({ userId: userIdField });


export const cartValidator = {
    addToCartSchema,
    updateCartQuantity,
    removeFromCartSchema,
    getCartItemsSchema
}