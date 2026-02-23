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
    limit: Joi.number().integer().min(1).max(50).default(9),
    category: Joi.string().custom(objectIdValidator),
  }),
};

export const createStorySchema = {
  [Segments.BODY]: Joi.object().keys({
    // img: Joi.string().uri().required(),
    title: Joi.string().min(1).max(80).required(),
    article: Joi.string().max(2500).required(),
    category: Joi.string().custom(objectIdValidator),
    // category: Joi.string().valid(...TAGS),
  }),
};
