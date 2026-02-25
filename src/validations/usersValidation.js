// filepath: d:\Projects\project-travelers8-back\src\validations\usersValidation.js
import { Joi, Segments } from 'celebrate';

export const getUserByIdSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().hex().length(24).required().messages({
      'string.hex': 'Invalid user id format',
      'string.length': 'Invalid user id length',
      'any.required': 'User id is required',
    }),
  }),
};