import Joi from "joi";

const addProductSchema = Joi.object({
  productName: Joi.string().min(2).max(100).required().messages({
    "any.required": "Product name is required",
    "string.empty": "Product name cannot be empty",
    "string.min": "Product name must be at least 2 characters long",
    "string.max": "Product name must be less than or equal to 100 characters"
  }),

  productImage: Joi.string().uri().optional().messages({
    "string.uri": "Product image must be a valid URL"
  }),

  price: Joi.number().positive().precision(2).required().messages({
    "any.required": "Price is required",
    "number.base": "Price must be a number",
    "number.positive": "Price must be a positive value"
  }),

  description: Joi.string().max(500).optional().messages({
    "string.max": "Description must not exceed 500 characters"
  }),

  category: Joi.string().max(50).optional().messages({
    "string.max": "Category must not exceed 50 characters"
  })
});

const deleteProductSchema = Joi.object({
  productId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
    "any.required": "Product ID is required",
    "string.empty": "Product ID cannot be empty",
    "string.pattern.base": "Product ID must be a valid MongoDB ObjectId"
  })
});

const updateProductSchema = Joi.object({
  productName: Joi.string().min(2).max(100).messages({
    "string.min": "Product name must be at least 2 characters long",
    "string.max": "Product name must be less than or equal to 100 characters"
  }),

  price: Joi.number().positive().precision(2).messages({
    "number.base": "Price must be a number",
    "number.positive": "Price must be a positive value"
  }),

  description: Joi.string().max(500).messages({
    "string.max": "Description must not exceed 500 characters"
  }),

  category: Joi.string().max(50).messages({
    "string.max": "Category must not exceed 50 characters"
  })
}).min(1).messages({
  "object.min": "At least one field must be provided for update"
});

const getAllProductsSchema = Joi.object({
  page: Joi.number().min(1).default(1).messages({
    "number.base": "Page must be a number",
    "number.min": "Page must be greater than or equal to 1"
  }),
  limit: Joi.number().min(1).max(100).default(10).messages({
    "number.base": "Limit must be a number",
    "number.min": "Limit must be greater than or equal to 1",
    "number.max": "Limit must not exceed 100"
  })
});

const getProductByIdSchema = Joi.object({
  id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
    "any.required": "Product ID is required",
    "string.empty": "Product ID cannot be empty",
    "string.pattern.base": "Product ID must be a valid MongoDB ObjectId"
  })
});

const getProductsByCategorySchema = Joi.object({
  category: Joi.string().max(50).required().messages({
    "any.required": "Category is required",
    "string.empty": "Category cannot be empty",
    "string.max": "Category must not exceed 50 characters"
  }),
  page: Joi.number().min(1).default(1).messages({
    "number.base": "Page must be a number",
    "number.min": "Page must be greater than or equal to 1"
  }),
  limit: Joi.number().min(1).max(100).default(10).messages({
    "number.base": "Limit must be a number",
    "number.min": "Limit must be greater than or equal to 1",
    "number.max": "Limit must not exceed 100"
  })
});

const searchProductsWithCategorySchema = Joi.object({
  productName: Joi.string().min(1).max(100).required().messages({
    "any.required": "Product name is required",
    "string.empty": "Product name cannot be empty",
    "string.min": "Product name must be at least 1 character long",
    "string.max": "Product name must be less than or equal to 100 characters"
  }),
  page: Joi.number().min(1).default(1).messages({
    "number.base": "Page must be a number",
    "number.min": "Page must be greater than or equal to 1"
  }),
  limit: Joi.number().min(1).max(100).default(10).messages({
    "number.base": "Limit must be a number",
    "number.min": "Limit must be greater than or equal to 1",
    "number.max": "Limit must not exceed 100"
  })
});

export const productValidation = {
    addProductSchema,
    deleteProductSchema,
    updateProductSchema,
    getAllProductsSchema,
    getProductByIdSchema,
    getProductsByCategorySchema,
    searchProductsWithCategorySchema
}



