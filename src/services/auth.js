import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { User } from '../models/user.js';

export const registerUser = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) throw createHttpError(409, 'Email already in use');

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: passwordHash,
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
  };
};
