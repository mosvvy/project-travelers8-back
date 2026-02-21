import { Joi, Segments } from 'celebrate';

export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().max(64).required().messages({
      'string.email': 'Invalid email format',
      'any.required': 'Email is required',
    }),

    password: Joi.string().min(8).max(128).required().messages({
      'any.required': 'Password is required',
    }),
  }),
};
