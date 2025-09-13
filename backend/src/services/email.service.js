import { transporter } from "../config/email.config.js";
import logger from "../utils/logger/logger.js";
import { ApiError } from "../utils/responses/ApiError.js";
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "../utils/email/resetPassword.template.js";

const injectTemplateVariables = (template, variables) => {
    let result = template;
    for(const [key, value] of Object.entries(variables)){
        result = result.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }

    return result;
}

export const sendPasswordResetEmail = async (email, resetLink) => {
    try {
        const html = injectTemplateVariables(PASSWORD_RESET_REQUEST_TEMPLATE, {
            reset_link: resetLink
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Reset Your Password",
            html
        })

    } catch (error) {
        logger.error("Error while sending password reset email", {
            message: err.message, stack: err.stack, email
        });
        throw new ApiError(500, "Error while sending password reset email")
    }
}

export const sendPasswResetSuccessEmail = async (email) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Password Was Successfully Changed",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    });
  } catch (err) {
    logger.error("Error while sending password reset success email", {
        message: err.message, stack: err.stack, email
    });
    throw new ApiError(500, "Error while sending password reset success email")
  }
};

