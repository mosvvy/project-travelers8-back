import { Joi } from 'celebrate';

export const registerSchema = {
  body: Joi.object({
    name: Joi.string().max(32).required(),
    email: Joi.string().email().max(64).required(),
    password: Joi.string().min(8).max(128).required(),
  }),
};
