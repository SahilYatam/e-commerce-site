import Joi from "joi"

const singupSchema = Joi.object({
    email: Joi.string().email({tlds: {allow: false}}).trim().lowercase().required().messages({
        "any.required": "Email is required",
        "string.email": "Email must be a valid email address",
        "string.base": "Email must be a string",
        "string.empty": "Email cannot be empty"
    }),

    name: Joi.string().trim().min(2).max(20).required().messages({
        "any.required": "Name is required",
        "string.base": "Name must be a string",
        "string.empty": "Name cannot be empty",
        "string.min": "Name must be at least 2 characters long",
        "string.max": "Name must be at most 20 characters long",
    }),

    password: Joi.string().min(8).max(16).pattern(new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$")).required().messages({
        "any.required": "Password is required",
        "string.min": "Password must be at lease 8 characters long",
        "string.max": "Password cannot exceed 20 characters",
        "string.pattern.base": "Password must contain at least one latter and one number",
        "stringe.empty": "Password cannot be empty",
    })

});

const loginSchema = Joi.object({
    email: Joi.string().email().trim().lowercase().required().messages({
        "string.email": "Email must be valid",
        "any.required": "Email is required",
        "string.empty": "Email cannot be empty"
    }),

    password: Joi.string().min(8).max(16).required().messages({
        "any.required": "Password is required",
        "string.empty": "Password cannot be empty",
    })
});

const logoutSchema = Joi.object({
    refreshToken: Joi.string().required().messages({
        "any.required": "Refresh token is required to logout",
        "string.empty": "Refresh token cannot be empty"
    })
});

const changePasswordSchema = Joi.object({
  oldPassword: Joi.string()
    .required()
    .messages({
      'string.base': 'Current password must be a string',
      'string.empty': 'Current password is required',
      'any.required': 'Current password is required',
    }),

  newPassword: Joi.string()
    .min(8)
    .max(64)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    .required()
    .messages({
      'string.base': 'New password must be a string',
      'string.empty': 'New password is required',
      'string.min': 'New password must be at least 8 characters long',
      'string.max': 'New password cannot exceed 64 characters',
      'string.pattern.base': 'New password must include at least one uppercase letter, one lowercase letter, and one number',
      'any.required': 'New password is required',
    }),

    confirmPassword: Joi.string()
    .valid(Joi.ref('newPassword'))
    .required()
    .messages({
        'any.only': 'Confirm password must match the new password',
        'string.empty': 'Confirm password is required',
        'any.required': 'Confirm password is required',
    }),
});

const changeNameSchema = Joi.object({
    name: Joi.string().trim().min(2).max(20).required().messages({
        "any.required": "Name is required",
        "string.base": "Name must be a string",
        "string.empty": "Name cannot be empty",
        "string.min": "Name must be at least 2 characters long",
        "string.max": "Name must be at most 20 characters long",
    }),
});

export const authValidate = {
    singupSchema,
    loginSchema,
    logoutSchema,
    changePasswordSchema,
    changeNameSchema
}