import { Schema, model } from 'mongoose';
const categorySchema = new Schema({
  name: { type: String, required: true, trim: true },
});
export const Category = model('Category', categorySchema);
