import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  if (!isValidObjectId(value)) {
    return helpers.message('Invalid id format');
  }
  return value;
};

export { objectIdValidator };
