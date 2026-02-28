import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  if (!isValidObjectId(value)) {
    return helpers.message('Invalid id format');
  }
  return value;
};

export const getAllStoriesSchema = {
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).default(10),
    category: Joi.string().custom(objectIdValidator),
  }),
};

export const createStorySchema = {
  [Segments.BODY]: Joi.object().keys({
    // img: Joi.string().uri().required(),
    title: Joi.string().min(1).max(80).required(),
    article: Joi.string().max(2500).required(),
    category: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const getStoryByIdSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().hex().length(24).required().messages({
      'string.hex': 'Invalid user id format',
      'string.length': 'Invalid user id length',
      'any.required': 'User id is required',
    }),
  }),
};

export const updateStorySchema = {
  [Segments.PARAMS]: Joi.object().keys({
    storyId: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().min(1).max(80),
    article: Joi.string().max(2500),
    category: Joi.string().custom(objectIdValidator),
  }),
};
