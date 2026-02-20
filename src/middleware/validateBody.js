import { celebrate } from 'celebrate';

export const validateBody = (schema) => celebrate(schema);
