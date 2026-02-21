import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  avatarUrl: {
    type: String,
  },
  articlesAmount: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const User = model('User', userSchema);
