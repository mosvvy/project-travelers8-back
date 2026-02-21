import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { User } from '../models/User.js';

export const registerController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // 1) check existing user by email
    const existing = await User.findOne({ email });
    if (existing) throw createHttpError(409, 'Email already in use');

    // 2) hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // 3) create user in DB
    const user = await User.create({
      name,
      email,
      password: passwordHash,
    });

    // 4) return safe user (no password)
    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    next(err);
  }
};
