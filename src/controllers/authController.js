import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import User from '../models/User.js';
import Session from '../models/session.js';
import { createSession, setSessionCookies } from '../services/auth.js';

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Перевіряємо чи поля передані
  if (!email || !password) {
    throw createHttpError(400, 'Email and password required');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw createHttpError(401, 'Invalid credentials');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw createHttpError(401, 'Invalid credentials');
  }

  await Session.deleteOne({ userId: user._id });

  const newSession = await createSession(user._id);
  setSessionCookies(res, newSession);
  const { password: skip, ...userResponse } = user.toObject();

  res.status(200).json({
    user: userResponse,
    token,
  });
};
