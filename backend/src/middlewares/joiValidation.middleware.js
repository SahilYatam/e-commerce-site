import logger from "../utils/logger/logger.js";

const ALLOWED_PROPERTIES = ['body', 'query', 'params', 'headers', 'cookies'];

const DEFAULT_JOI_OPTIONS = {
  abortEarly: false,
  stripUnknown: true,
  errors: { wrap: { label: false } },
};

export const validateRequest = (schema, properties = "body", joiOptions = {}) => {
  if (!schema || typeof schema.validate !== 'function') {
    throw new Error('Invalid schema: must be a Joi schema object');
  }

  // normalize properties to an array
  const props = Array.isArray(properties) ? properties : [properties];

  // validate properties
  props.forEach(prop => {
    if (!ALLOWED_PROPERTIES.includes(prop)) {
      throw new Error(`Invalid property: ${prop}. Must be one of: ${ALLOWED_PROPERTIES.join(', ')}`);
    }
  });

  return (req, res, next) => {
    try {
      const validationOptions = { ...DEFAULT_JOI_OPTIONS, ...joiOptions };
      const errorDetails = [];

      for (const prop of props) {
        const dataToValidate = req[prop] || {};
        const { error, value } = schema.validate(dataToValidate, validationOptions);

        if (error) {
          errorDetails.push(...error.details.map(detail => ({
            property: prop,
            path: detail.path.join("."),
            message: detail.message
          })));
        } else {
          req[prop] = value;
        }
      }

      if (errorDetails.length) {
        return res.status(400).json({ success: false, message: 'Validation error', errors: errorDetails });
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};
